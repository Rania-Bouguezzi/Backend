import { User } from "src/Entities/users/users.entity";
import { Entity, ManyToOne } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Mission } from "../missions/missions.entity";


@Entity()
export class Driver extends User{

    @ManyToOne(() => Agency, agency => agency.drivers)
    agency: Agency    
    @ManyToOne(() => Mission, mission => mission.drivers)
    mission: Mission;
       

}