import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from "../agencies/agencies.entity";
import { Transfer } from "../transfers/transfers.entity";
import { Payment } from "../payment/payment.entity";
import { typeStatus } from "src/Type/Type";


@Entity()
export class Booking{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    totalPrice:number;
    @Column({nullable: true})
    dateReservation:string;
    @Column()
    numberReservedPlaces:number;
    @Column()
    etatReservation:string;
    @Column({nullable: true})
    dateRefus:string;
    @Column({nullable: true})
    dateAcceptation:string;
    @Column()
    dateCreation:string;
    @Column()
    dateUpdate:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=>Agency, agency=> agency.bookings)
    agency:Agency;
    @ManyToOne(()=>Transfer, transfer=>transfer.bookings )
    transfer:Transfer;
    @OneToMany(()=> Payment, payment=>payment.booking)
    payments:Payment[];


}