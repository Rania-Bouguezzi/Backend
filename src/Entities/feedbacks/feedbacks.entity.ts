import { typeStatus } from "src/Type/Type";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "../agent/agent.entity";
import { Mission } from "../missions/missions.entity";



@Entity()
export class Feedback {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    text:string;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=> Agent, agent=> agent.feedbacks)
    agent:Agent;
    @ManyToOne(()=> Mission, mission=> mission.feedbacks)
    mission:Mission;
    


}