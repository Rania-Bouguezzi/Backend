import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { typeStatus } from "src/Type/Type";




export class CreateAgency{


id:string;
@IsString()
name:string;
@IsString()
logo:string;
@IsEmail()
email:string;
@IsString()
website:string;
@IsString()
phone:string;
@IsString()
address:string;
@IsString()
type:string
@IsDateString()
dateCreation:string = new Date().toISOString();
@IsDateString()
dateUpdate:string = new Date().toISOString();
@IsIn(Object.values(typeStatus))
status:typeStatus;


}