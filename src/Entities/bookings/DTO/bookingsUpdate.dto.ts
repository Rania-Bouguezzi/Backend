import { PartialType } from "@nestjs/mapped-types";
import { CreateBooking } from "./bookingsCreate.dto";




export class UpdateBooking extends PartialType(CreateBooking){
    
}