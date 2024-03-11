import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomer } from "./customersCreate.dto";

export class UpdateCustomer extends PartialType(CreateCustomer){}