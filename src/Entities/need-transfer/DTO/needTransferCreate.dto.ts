import { IsDateString, IsString } from "class-validator";




export class NeedTransferCreate {
    id:string;
    @IsString()
    text:string;
    @IsDateString()
    dateCreation:string= new Date().toISOString();
    agencyId:string;
    agentId:string;


}