import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from "src/user/user.model";


export enum UserState {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}


@ObjectType()
@Entity()
export class Profile {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({nullable: true})
    @Column({default: null})
    firstName?: string;
    @Field({nullable: true})
    @Column({default: null})
    lastName?: string;

    @Field({nullable: true})
    @Column(
        {
        type: "enum",
        enum: UserState,
        default: UserState.ACTIVE
    })
    state?: UserState;

    @Field(type => User)
    @OneToOne(() => User, (user) => user.profile, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;
}

