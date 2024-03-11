import { PartialType } from "@nestjs/mapped-types";
import { CreateFeedback } from "./feedbacksCreate.dto";

export class UpdateFeedback extends PartialType(CreateFeedback){

}