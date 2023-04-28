import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Role } from './role/role.model';
import { RoleModule } from './role/role.module';
import { Profile } from './profile/profile.model';

@Module({
  imports: [
    UserModule,
    RoleModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'nest',
      entities: [User, Profile, Role],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
