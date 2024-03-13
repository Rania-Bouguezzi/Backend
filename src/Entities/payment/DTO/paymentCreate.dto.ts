import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";

export class CreatePayment{


id:string;
@IsNumber()
montant:number;
@IsString()
modePayment:string;
@IsString()
device:string;
@IsString()
etatPaiement:string;
@IsDateString()
datePayment:string;
@IsIn(Object.values(typeStatus))
status:typeStatus;


}