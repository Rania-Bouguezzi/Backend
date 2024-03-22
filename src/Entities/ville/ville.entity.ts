import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Ville{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
}