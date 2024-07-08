import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Message{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    username: string; 
    @Column()
    logo:string;
    @Column() 
    agencyName:string;
    @Column() 
    userRecepteur:string;
    @Column() 
    userEmetteur:string;
    @Column()
    message: string;
}