import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { UserState } from 'src/profile/profile.model';


@Resolver(of => User)
export class UserResolver{
    constructor(
        @Inject(UserService) private userService: UserService
    ){}

    @Query(returns => [User])
    async users(@Args('role_name', {nullable: true}) role_name?: string): Promise<User[]> {
        return await this.userService.getAll(role_name);
    }

    @Mutation(returns => User)
    async createUser(
        @Args('username') username: string,
        @Args('email') email: string,
        @Args('role_machine_name') role_machine_name: string,
        @Args('firstName', {nullable: true}) firstName?: string,
        @Args('lastName', {nullable: true}) lastName?: string,
        @Args('state', {defaultValue: UserState.ACTIVE}) state?: UserState,
    ): Promise<User> {
        return await this.userService.create({username, email}, {firstName, lastName, state}, role_machine_name)
    }

    @Mutation(returns => User)
    async updateUser(
        @Args('username') username: string,
        @Args('firstName', {nullable: true}) firstName?: string,
        @Args('lastName', {nullable: true}) lastName?: string,
        @Args('state', {nullable: true}) state?: UserState,
        @Args('role_machine_name', {nullable: true}) role_machine_name?: string,
    ): Promise<User> {
        return await this.userService.update(username, {firstName, lastName, state}, role_machine_name)
    }

    @Mutation(returns => Number)
    async deleteUser(@Args('username') username: string){
        return await this.userService.delete(username)
    }

}