import { User } from "src/Entities/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Mission } from "../missions/missions.entity";
import { SuperAgent } from "../super-agent/superAgent.entity";


@Entity()
export class Driver extends User{

    @ManyToOne(() => Agency, agency => agency.drivers)
    agency: Agency  
    @OneToMany(()=> Mission, mission=> mission.driver)
    missions:Mission[];
    @ManyToOne(()=> SuperAgent, super_agent=>super_agent.drivers)
    super_agent:SuperAgent;
    @Column({nullable:true})
    busId:string;
       

}