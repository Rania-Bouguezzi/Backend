import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";

export class CreateBus {



id:string;
@IsString()
marque:string
@IsNumber()
puissance:number
@IsNumber()
nbrePlaces:number
@IsDateString()
dateCreation:string= new Date().toISOString();
@IsDateString()
dateUpdate:string =new Date().toISOString();
@IsIn(Object.values(typeStatus))
status:typeStatus;






}