import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transfer } from "../transfers/transfers.entity";
import { Bus } from "../buses/buses.entity";
import { Driver } from "../drivers/driver.entity";
import { EtatMission, typeStatus } from "src/Type/Type";
import { Agent } from "../agent/agent.entity";
import { Feedback } from "../feedbacks/feedbacks.entity";



@Entity()
export class Mission{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    from:string;
    @Column()
    to:string;
    @Column()
    date_time_start:string;
    @Column()
    date_time_end:string;
    @Column()
    nbrPassengers:number;
    @Column({default:0})
    totalPrice:number;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @Column()
    dateMission:string;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @OneToMany(() => Transfer, transfer => transfer.mission)
    transfers: Transfer[]; 
    @ManyToOne(()=> Driver, driver=>driver.missions)
    driver:Driver;
    @ManyToOne(()=> Bus, bus=>bus.missions)
    bus:Bus;
    @ManyToOne(() => Agent, agent => agent.missions)
    agent: Agent ;
    @Column({default:false})
    isShared:boolean;
    @Column({nullable:true})
    dateShare:string;
    @Column({ type: 'enum', enum: EtatMission })
    etatMission:EtatMission;
    @OneToMany(()=> Feedback, feedback=> feedback.mission)
     feedbacks: Feedback[];




}