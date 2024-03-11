import { IsDateString, IsNumber, IsString } from "class-validator";
import { CreateUser } from "src/Entities/users/DTO/usersCreate.dto";

export class CreateDriver extends CreateUser{


@IsString()    
numPermis:string;
@IsDateString()
permisExpir:string


}

