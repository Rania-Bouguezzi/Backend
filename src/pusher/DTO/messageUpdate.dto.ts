import { PartialType } from "@nestjs/mapped-types";
import { messageCreate } from "./messageCreate.dto";

export class messageUpdate extends PartialType(messageCreate){}