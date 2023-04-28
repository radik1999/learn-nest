import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./role.model";
import { Repository } from "typeorm";
import { RoleDTO } from "./role.dto";


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) 
        private roleRep: Repository<Role>
    ){}

    async getAll() {
        return await this.roleRep.find();
    }
    
    async create(data: RoleDTO){
        return await this.roleRep.save(data);
    }

    async getRoleByMachineName(machine_name: string): Promise<Role>{
        return await this.roleRep.findOneByOrFail({'machine_name': machine_name})
    }
}