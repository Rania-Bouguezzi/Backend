import { IsNotEmpty, IsString } from "class-validator";
import { CreateUser } from "src/Entities/users/DTO/usersCreate.dto";

export class CreateAgent extends CreateUser{
   // @IsNotEmpty()
   // @IsString()  
   // agencyId:string;
   //reactionId:string; 
   agencyId:string;
   spaId:string;
}