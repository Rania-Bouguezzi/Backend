import { IsDateString, IsIn, IsString } from "class-validator";
import { ReactionType, typeStatus } from "src/Type/Type";







export class CreateReaction{


id:number;
@IsIn(Object.values(ReactionType))
reactionType:ReactionType;
@IsDateString()
sendingTime:string;
@IsDateString()
dateUpdate:string;
@IsIn(Object.values(typeStatus))
status:typeStatus;


}