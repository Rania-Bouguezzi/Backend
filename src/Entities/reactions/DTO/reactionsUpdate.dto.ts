import { PartialType } from "@nestjs/mapped-types";
import { CreateReaction } from "./reactionsCreate.dto";

export class UpdateReaction extends PartialType(CreateReaction){
    
}