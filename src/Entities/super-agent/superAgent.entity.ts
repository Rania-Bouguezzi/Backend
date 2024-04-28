import { User } from "src/Entities/users/users.entity";
import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Bus } from "../buses/buses.entity";
import { Transfer } from "../transfers/transfers.entity";
import { Agent } from "../agent/agent.entity";
import { Driver } from "../drivers/driver.entity";


@Entity()
export class SuperAgent extends User{
  
    @OneToOne(()=>Agency, agency=>agency.superAgent)
    @JoinColumn()
    agency:Agency;
    @OneToMany(()=> Bus, bus=> bus.super_agent)
    buses:Bus[];
    @OneToMany(()=> Agent, agent=> agent.super_agent)
    agents:Agent[];
    @OneToMany(()=> Driver, driver=> driver.super_agent)
    drivers:Driver[];

}