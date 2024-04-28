import { IsBoolean, IsDateString, IsIn, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";

export class CreateNotification {
   
    id:string;
    title:string;
    message:string;
    sound:string;
    sending:boolean=false;
    agencyEmettriceName:string;
    agencyEmettriceLogo:string;
    @IsDateString()
    sendingTime:string= new Date().toISOString();
    @IsDateString()
    dateCreation:string= new Date().toISOString();
    @IsDateString()
    dateUpdate:string= new Date().toISOString();
  //  @IsIn(Object.values(typeStatus))
    status:typeStatus;
    agentId:string;

}