import { PartialType } from "@nestjs/mapped-types";
import { CreateTranfer } from "./tranfersCreate.dto";






export class UpdateTransfer extends PartialType(CreateTranfer){}