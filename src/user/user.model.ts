import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;
    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    email: string;
    @Field()
    @Column()
    hash: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}