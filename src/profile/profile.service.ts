import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "./profile.model";
import { ProfileDTO } from "./profile.dto";
import { UserDTO } from "src/user/user.dto";


@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile) 
        private profileRep: Repository<Profile>
    ){}
    
    async create(profile_data: ProfileDTO, user_data: UserDTO){
        const profile = this.profileRep.merge(new Profile(), profile_data, {user: user_data})
        return await this.profileRep.save(profile);
    }

    async getProfileById(id){
        return await this.profileRep.findOneByOrFail({id: id})
    }

    async update(id, data: ProfileDTO){
        let profile = await this.getProfileById(id)
        profile = this.profileRep.merge(profile, data)

        return await this.profileRep.save(profile)
    }
}