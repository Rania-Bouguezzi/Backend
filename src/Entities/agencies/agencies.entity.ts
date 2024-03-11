import { Agent } from "src/Entities/agent/agent.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Transfer } from "../transfers/transfers.entity";
import { SuperAgent } from "../super-agent/superAgent.entity";
import { Driver } from "../drivers/driver.entity";
import { Customer } from "../customers/customer.entity";
import { Bus } from "../buses/buses.entity";
import { Booking } from "../bookings/bookings.entity";
import { typeStatus } from "src/Type/Type";

@Entity()
export class Agency{

@PrimaryGeneratedColumn()
id:number;
@Column()
name:string;
@Column()
logo:string;
@Column()
email:string;
@Column()
website:string;
@Column()
phone:string;
@Column()
address:string;
@Column()
type:string
@Column()
dateCreation:string;
@Column()
dateUpdate:string;
@Column({ type: 'enum', enum: typeStatus }) 
status:typeStatus;
@Column()
creatorAgent:string;
@Column()
updaterAgent:string;
@OneToMany(() => Agent, agent => agent.agency)
agents: Agent[];
@ManyToMany(()=> Transfer, transfer => transfer.agencies)
@JoinTable()
transfers : Transfer[];
@OneToOne(() => SuperAgent, superAgent => superAgent.agency)
superAgent: SuperAgent;
@OneToMany(() => Driver, driver => driver.agency)
drivers: Driver[];
@OneToMany(() => Customer, customer => customer.agency)
customers: Driver[];
@OneToMany(()=>Bus, bus =>bus.agency)
buses:Bus[];
@OneToMany(()=> Booking, booking=> booking.agency)
bookings:Booking[];
}