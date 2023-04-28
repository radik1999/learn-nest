import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { Role } from '../role/role.model';
import { Profile } from 'src/profile/profile.model';
import { RoleModule } from 'src/role/role.module';
import { ProfileModule } from 'src/profile/profile.module';


@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Profile]), RoleModule, ProfileModule],
    providers: [UserService, UserResolver],
})
export class UserModule {}
