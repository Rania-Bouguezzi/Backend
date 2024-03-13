import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";



export class CreateBooking {


id:string;
@IsNumber()
totalPrice:number;
dateReservation:string;
@IsNumber()
numberReservedPlaces:number;
@IsString()
etatReservation:string;
dateRefus?:string;
dateAcceptation?:string;
@IsDateString()
dateCreation:string = new Date().toISOString();
@IsDateString()
dateUpdate:string = new Date().toISOString();
@IsIn(Object.values(typeStatus))
status:typeStatus;



}