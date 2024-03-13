import { IsDateString, IsIn, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";

export class CreateFeedback {

id:string;
@IsString()
text:string;
@IsDateString()
dateCreation:string;
@IsDateString()
dateUpdate:string;
@IsIn(Object.values(typeStatus))
status:typeStatus;

}