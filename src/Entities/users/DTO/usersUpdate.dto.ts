import { PartialType } from "@nestjs/mapped-types";
import { CreateUser } from "./usersCreate.dto";

export class UpdateUser extends PartialType(CreateUser){}

