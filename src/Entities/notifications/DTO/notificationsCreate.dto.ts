import { IsBoolean, IsDateString, IsIn, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";

export class CreateNotification {
   
    id:number;
    @IsString()
    title:string;
    @IsString()
    message:string;
    @IsString()
    sound:string;
    @IsBoolean()
    sending:boolean=false;
    @IsDateString()
    sendingTime:string;
    @IsDateString()
    dateCreation:string;
    @IsDateString()
    dateUpdate:string;
    @IsIn(Object.values(typeStatus))
    status:typeStatus;

}