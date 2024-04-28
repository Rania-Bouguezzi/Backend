import { CreateUser } from "src/Entities/users/DTO/usersCreate.dto";

export class SuperAgentCreate extends CreateUser{
    agencyId:string;
}