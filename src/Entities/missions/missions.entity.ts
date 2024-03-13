import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transfer } from "../transfers/transfers.entity";
import { Bus } from "../buses/buses.entity";
import { Driver } from "../drivers/driver.entity";
import { typeStatus } from "src/Type/Type";



@Entity()
export class Mission{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    from:string;
    @Column()
    to:string;
    @Column()
    date_time_start:string;
    @Column()
    date_time_end:string;
    @Column()
    nbrPassengers:number;
    @Column()
    totalPrice:number;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @Column()
    dateMission:string;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @OneToMany(() => Transfer, transfer => transfer.mission)
    transfers: Transfer[];
  
    @OneToMany(() => Bus, bus => bus.mission)
    buses: Bus[];
  
    @OneToMany(() => Driver, driver => driver.mission)
    drivers:Driver[];

}