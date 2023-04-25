import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { User } from './user.model';
import { Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver{
    constructor(
        @Inject(UserService) private userService: UserService
    ){}

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await this.userService.getAll();
    }
}