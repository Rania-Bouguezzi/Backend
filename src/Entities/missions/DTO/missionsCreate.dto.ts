import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";
import { IsNull } from "typeorm";

export class CreateMission {
 
    id:string;
    @IsString()
    name:string;
    @IsString()
    from:string;
    @IsString()
    to:string;
    @IsDateString()
    date_time_start;
    @IsDateString()
    date_time_end;
    @IsNumber()
    nbrPassengers:number;
    @IsNumber()
    totalPrice:number;
    @IsIn(Object.values(typeStatus))
    status:typeStatus;
    @IsDateString()
    dateMission:string;
    @IsDateString()
    dateCreation:string= new Date().toISOString();
    @IsDateString()
    dateUpdate:string=new Date().toISOString();

}