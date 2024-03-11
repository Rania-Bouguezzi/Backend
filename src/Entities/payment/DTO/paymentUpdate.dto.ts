import { PartialType } from "@nestjs/mapped-types";
import { CreatePayment } from "./paymentCreate.dto";

export class UpdatePayment extends PartialType(CreatePayment) {}