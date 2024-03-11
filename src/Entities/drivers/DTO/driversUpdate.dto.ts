import { PartialType } from "@nestjs/mapped-types";
import { CreateDriver } from "./driversCreation.dto";

export class UpdateDriver extends PartialType(CreateDriver){}