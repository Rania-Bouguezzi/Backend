import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedback } from './DTO/feedbacksCreate.dto';
import { UpdateFeedback } from './DTO/feedbacksUpdate.dto';

@Controller('feedbacks')
export class FeedbacksController {
constructor(private readonly feedbackService : FeedbacksService){}

    @Get(':id')
findById(@Param('id') id : number){
    return this.feedbackService.findOne(id);
}

@Post('add')
createFeedbck(@Body() feedback: CreateFeedback){
    return this.feedbackService.createFeedback(feedback);
}

@Patch('id')
updateFeedback(@Param('id') id:number, @Body() feedback:UpdateFeedback)
{ const newFeed = this.feedbackService.findOne(id);
    
    if(!newFeed){
      throw new HttpException('Feedback not found', 404)
    }
  
    return this.feedbackService.updateFeedback(id,feedback)  
}

@Delete(':id')
deleteFeedback(@Param('id') id : number){
    const feedback = this.feedbackService.findOne(id)
    if (!feedback) {
        throw new HttpException('Feedback not found ', 404)
    
    }
   return this.feedbackService.delteFeedback(id)
}



}
