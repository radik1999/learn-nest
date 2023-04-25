import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserResolver } from './user.resolver';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserResolver],
})
export class UserModule {}
