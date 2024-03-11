import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../bookings/bookings.entity";
import { typeStatus } from "src/Type/Type";

@Entity()
export class Payment{

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    montant:number;
    @Column()
    modePayment:string;
    @Column()
    device:string;
    @Column()
    etatPaiement:string;
    @Column()
    datePayment:string;
    @Column({ type: 'enum', enum: typeStatus }) 
    status:typeStatus;
    @ManyToOne(()=>Booking, booking=>booking.payments)
    booking:Booking;





}