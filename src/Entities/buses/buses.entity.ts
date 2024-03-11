import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Mission } from "../missions/missions.entity";
import { typeStatus } from "src/Type/Type";


@Entity()
export class Bus{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    marque:string
    @Column()
    puissance:number
    @Column()
    nbrePlaces:number
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=> Agency, agency=>agency.buses)
    agency:Agency;
    @ManyToOne(() => Mission, mission => mission.buses)
    mission: Mission;
    

}