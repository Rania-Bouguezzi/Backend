import { User } from "src/Entities/users/users.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { Agency } from "../agencies/agencies.entity";


@Entity()
export class SuperAgent extends User{
  
    @OneToOne(()=>Agency, agency=>agency.superAgent)
    @JoinColumn()
    agency:Agency;




}