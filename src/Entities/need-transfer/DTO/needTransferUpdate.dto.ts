import { PartialType } from "@nestjs/mapped-types"
import { NeedTransferCreate } from "./needTransferCreate.dto"




export class NeedTransferUpdate extends PartialType (NeedTransferCreate){}