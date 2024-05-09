import { User } from "src/Entities/users/users.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Mission } from "../missions/missions.entity";
import { SuperAgent } from "../super-agent/superAgent.entity";


@Entity()
export class Driver extends User{

    @ManyToOne(() => Agency, agency => agency.drivers)
    agency: Agency  
    @ManyToOne(() => Mission, mission => mission.drivers)
    mission: Mission;
    @ManyToOne(()=> SuperAgent, super_agent=>super_agent.drivers)
    super_agent:SuperAgent;
    @Column({nullable:true})
    busId:string;
       

}