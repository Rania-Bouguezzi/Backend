import { PartialType } from "@nestjs/mapped-types"
import { CreateBus } from "./busesCreate.dto"

export class UpdateBus extends PartialType(CreateBus){

}