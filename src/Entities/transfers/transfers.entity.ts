import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Booking } from "../bookings/bookings.entity";
import { Mission } from "../missions/missions.entity";
import { typeStatus } from "src/Type/Type";
import { SuperAgent } from "../super-agent/superAgent.entity";
import { Agent } from "../agent/agent.entity";


@Entity()
export class Transfer{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    from:string;
    @Column()
    to:string;
    @Column()
    date_time_Depart:string;
    @Column()
    date_time_Arrive:string;
    @Column()
    nbrePlacesDisponibles:number;
    @Column()
    priceTransferForPerson:number;
    @Column()
    etatTransfer:string;
    @Column()
    note:string;
    @Column()
    extra:number;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(() => Agency, agency => agency.transfers)
    agency: Agency  
    @OneToMany(()=>Booking, booking=>booking.transfer)
    bookings:Booking[];
    @ManyToOne(() => Mission, mission => mission.transfers)
    mission: Mission;
    @ManyToOne(()=> Agent, agent=>agent.transfers)
    agent:Agent;





}