import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Mission } from "../missions/missions.entity";
import { typeStatus } from "src/Type/Type";
import { SuperAgent } from "../super-agent/superAgent.entity";


@Entity()
export class Bus{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    marque:string;
    @Column()
    puissance:number;
    @Column({nullable:true})
    matricule:string;
    @Column({nullable:true})
    picture:string;
    @Column()
    nbrePlaces:number;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=> Agency, agency=>agency.buses)
    agency:Agency;
    @OneToMany(()=> Mission, mission=> mission.bus)
    missions:Mission[];
    @ManyToOne(()=> SuperAgent, super_agent=>super_agent.buses)
    super_agent:SuperAgent;

}