
import { typeStatus } from "src/Type/Type";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "../agent/agent.entity";

@Entity()
export class Notification{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    title:string;
    @Column()
    message:string;
    @Column()
    sound:string;
    @Column({ default: false })
    sending:boolean;
    @Column()
    sendingTime:string;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=>Agent, agent=>agent.notifications)
    agent:Agent;


}