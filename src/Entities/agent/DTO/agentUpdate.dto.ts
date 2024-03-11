import { PartialType } from "@nestjs/mapped-types";
import { CreateAgent } from "./agentCreation.dto";

export class UpdateAgent extends PartialType (CreateAgent){}