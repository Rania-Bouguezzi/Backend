import { IsDateString, IsIn, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";

export class CreateFeedback {

id:string;
@IsString()
text:string;
@IsDateString()
dateCreation:string= new Date().toISOString();
@IsDateString()
dateUpdate:string = new Date().toISOString();
// @IsIn(Object.values(typeStatus))
status:typeStatus;
agentId:string;
missionId:string;



}