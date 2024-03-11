import { PartialType } from "@nestjs/mapped-types";
import { CreateNotification } from "./notificationsCreate.dto";

export class UpdateNotification extends PartialType(CreateNotification){
    
}