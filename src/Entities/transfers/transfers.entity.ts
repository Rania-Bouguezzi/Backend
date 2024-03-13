import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Booking } from "../bookings/bookings.entity";
import { Mission } from "../missions/missions.entity";
import { typeStatus } from "src/Type/Type";


@Entity()
export class Transfer{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    from:string;
    @Column()
    to:string;
    @Column()
    date_time_Depart:string;
    @Column()
    date_heure_Arrive:string;
    @Column()
    nbrePlacesDisponibles:number;
    @Column()
    priceTransferForPerson:number;
    @Column()
    etatTransfer:string;
    @Column()
    note:string;
    @Column()
    extra:number;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToMany(()=> Agency, agency => agency.transfers)
    agencies: Agency[];
    @OneToMany(()=>Booking, booking=>booking.transfer)
    bookings:Booking[];
    @ManyToOne(() => Mission, mission => mission.transfers)
    mission: Mission;





}