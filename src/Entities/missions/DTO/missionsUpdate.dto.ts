import { PartialType } from "@nestjs/mapped-types";
import { CreateMission } from "./missionsCreate.dto";

export class UpdateMission extends PartialType(CreateMission){}