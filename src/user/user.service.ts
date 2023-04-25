import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRep: Repository<User>
    ){}

    async getAll() {
        return await this.userRep.find();
    }

}
