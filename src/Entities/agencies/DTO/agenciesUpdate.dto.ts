import { PartialType } from "@nestjs/mapped-types"
import { CreateAgency } from "./agenciesCreate.dto"




export class UpdateAgency extends PartialType(CreateAgency){}