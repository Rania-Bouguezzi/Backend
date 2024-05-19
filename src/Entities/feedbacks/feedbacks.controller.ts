import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedback } from './DTO/feedbacksCreate.dto';
import { UpdateFeedback } from './DTO/feedbacksUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('feedbacks')
@ApiTags('Feedbacks')
export class FeedbacksController {
constructor(private readonly feedbackService : FeedbacksService){}



@Get()
getAll(){
    return this.feedbackService.findAll();
}
    @Get(':id')
findById(@Param('id') id : string){
    return this.feedbackService.findOne(id);
}

@Post('add')
createFeedbck(@Body() feedback: CreateFeedback, missionId : string){
    return this.feedbackService.createFeedback(feedback, missionId);
}

@Patch(':id')
updateFeedback(@Param('id') id:string, @Body() feedback:UpdateFeedback)
{ const newFeed = this.feedbackService.findOne(id);
    
    if(!newFeed){
      throw new HttpException('Feedback not found', 404)
    }
  
    return this.feedbackService.updateFeedback(id,feedback)  
}

@Delete(':id')
deleteFeedback(@Param('id') id : string){
    const feedback = this.feedbackService.findOne(id)
    if (!feedback) {
        throw new HttpException('Feedback not found ', 404)
    
    }
   return this.feedbackService.delteFeedback(id)
}

@Get('mission/:id')
findFeedbackByAgency(@Param('id') id : string){
    return this.feedbackService.findByMission(id);
}

@Get('count/agency/:id')
countFeedback(@Param('id') id : string){
    return this.feedbackService.countFeedbacks(id);
}




}
