import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Role } from "./role.model";
import { Inject } from "@nestjs/common";
import { RoleService } from "./role.service";


@Resolver(of => Role)
export class RoleResolver{
    constructor(
        @Inject(RoleService) private roleService: RoleService
    ){}

    @Query(returns => [Role])
    async roles(): Promise<Role[]> {
        return await this.roleService.getAll();
    }

    @Mutation(returns => Role)
    async createRole(
        @Args('name') name: string,
        @Args('machine_name') machine_name: string,
    ): Promise<Role> {
        return await this.roleService.create({name, machine_name})
    }


}