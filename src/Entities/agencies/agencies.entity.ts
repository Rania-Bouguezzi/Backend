import { Agent } from "src/Entities/agent/agent.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Transfer } from "../transfers/transfers.entity";
import { SuperAgent } from "../super-agent/superAgent.entity";
import { Driver } from "../drivers/driver.entity";
import { Customer } from "../customers/customer.entity";
import { Bus } from "../buses/buses.entity";
import { Booking } from "../bookings/bookings.entity";
import { typeStatus } from "src/Type/Type";
import { NeedTransfer } from "../need-transfer/need-transfer.entity";

@Entity()
export class Agency{

@PrimaryGeneratedColumn('uuid')
id:string;
@Column()
name:string;
@Column()
logo:string;
@Column()
emailAgency:string;
@Column()
website:string;
@Column()
phoneAgency:string;
@Column()
addressAgency:string;
@Column()
type:string
@Column()
dateCreation:string;
@Column()
dateUpdate:string;
@Column({ type: 'enum', enum: typeStatus }) 
status:typeStatus;
@OneToMany(() => Agent, agent => agent.agency)
agents: Agent[];
// @ManyToMany(()=> Transfer, transfer => transfer.agencies)
// @JoinTable()
// transfers : Transfer[];
@OneToMany(() => Transfer, transfer => transfer.agency)
transfers: Transfer[];
@OneToOne(() => SuperAgent, superAgent => superAgent.agency)
superAgents: SuperAgent;
@OneToMany(() => Driver, driver => driver.agency)
drivers: Driver[];
@OneToMany(() => Customer, customer => customer.agency)
customers: Driver[];
@OneToMany(()=>Bus, bus =>bus.agency)
buses:Bus[];
@OneToMany(()=> Booking, booking=> booking.agency)
bookings:Booking[];
@OneToMany(()=> NeedTransfer, needTransfer=> needTransfer.agency)
needTransfers:NeedTransfer[];
}