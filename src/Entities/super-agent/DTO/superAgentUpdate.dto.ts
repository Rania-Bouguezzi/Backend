import { PartialType } from "@nestjs/mapped-types";
import { SuperAgentCreate } from "./superAgentCreate.dto";


export class SuperAgentUpdate extends PartialType(SuperAgentCreate){
    
}