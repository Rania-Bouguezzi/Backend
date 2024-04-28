import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Agent } from "../agent/agent.entity";





@Entity()
export class NeedTransfer  {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    text:string;
    @Column()
    dateCreation:string;
    @ManyToOne(()=>Agency, agency=> agency.needTransfers)
    agency:Agency;
    @ManyToOne(()=>Agent, agent=> agent.needTransfers)
    agent:Agent;


}