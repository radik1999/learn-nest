import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from "../role/role.model";
import { Profile } from "src/profile/profile.model";


@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({unique: true})
    username: string;

    @Field()
    @Column({unique: true})
    email: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => Role)
    @ManyToOne(ty1pe => Role, role => role.users, {nullable: false})
    role: Role;   

    @Field(type => Profile, {nullable: true})
    @OneToOne(() => Profile, (profile) => profile.user)
    profile?: Profile;
}
