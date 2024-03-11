import { typeStatus } from "src/Type/Type";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Feedback {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    text:string;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=>User, user=>user.feedbacks)
    user:User;
    


}