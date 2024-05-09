import { IsBoolean, IsDateString, IsIn, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";

export class CreateNotification {
   
    id:string;
    title:string;
    message:string;
    sound:string;
    sending:boolean=false;
    agentEmetteurId:string;
    agencyEmettriceId:string;
    agencyEmettriceName:string;
    agencyEmettriceLogo:string;
    transferId:string;
    from:string;
    to:string;
    nbPlaces:string;
    notifAccept:boolean;
    notifRefus:boolean;
    date_time:string = new Date().toISOString();
    validate:boolean=false;
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