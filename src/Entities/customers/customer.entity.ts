import { User } from "src/Entities/users/users.entity";
import { Entity, ManyToOne } from "typeorm";
import { Agency } from "../agencies/agencies.entity";



@Entity()
export class Customer extends User{

    @ManyToOne(() => Agency, agency => agency.customers)
    agency: Agency    
    
    



}