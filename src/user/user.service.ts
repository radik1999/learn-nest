import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import {  User } from "./user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "./user.dto";
import { ProfileDTO } from "src/profile/profile.dto";
import { RoleService } from "src/role/role.service";
import { ProfileService } from "src/profile/profile.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRep: Repository<User>,
        private roleService: RoleService,
        private profileService: ProfileService,
    ){}

    async getAll(role_name: string) {
        if (!role_name){
            return await this.userRep.find({relations: ['profile', 'role']});
        }
        else{
            return await this.userRep
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.profile', 'profile')
            .where({ role: { name: role_name } })
            .getMany();
        }
    }
    
    async getByUsername(username: string) {
        return await this.userRep.findOneOrFail({where: {username: username}, relations: ['profile', 'role']})
    }

    async create(user_data: UserDTO, profile_data: ProfileDTO, role_machine_name: string): Promise<User>{
        let user = this.userRep.merge(new User(), user_data);

        user.role = await this.roleService.getRoleByMachineName(role_machine_name)
        user = await this.userRep.save(user)

        user.profile = await this.profileService.create(profile_data, user)

        return user
    }

    async update(username: string, profile_data: ProfileDTO, role_machine_name: string){
        let user = await this.getByUsername(username)

        if(profile_data) {
            user.profile = await this.profileService.update(user.profile.id, profile_data)
        }

        if(role_machine_name) {
            user.role = await this.roleService.getRoleByMachineName(role_machine_name)
        }
        
        return await this.userRep.save(user)
    }

    async delete(username: string){
        return (await this.userRep.delete({username})).affected
    }
}
