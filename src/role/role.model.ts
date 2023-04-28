import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from "../user/user.model";

@ObjectType()
@Entity()
export class Role {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;
    @Field()
    @Column()
    machine_name: string;

    @Field(type => User)
    @OneToMany(ty1pe => User, user => user.role)
    users: User[];
    
}