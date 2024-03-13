import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedbacks.entity';
import { Repository } from 'typeorm';
import { CreateFeedback } from './DTO/feedbacksCreate.dto';
import { UpdateFeedback } from './DTO/feedbacksUpdate.dto';

@Injectable()
export class FeedbacksService {
    constructor(@InjectRepository(Feedback) private feedbackRepository : Repository<Feedback>){}



    findAll(){
        return this.feedbackRepository.find();
    }
    
    findOne(id:string){
        return this.feedbackRepository.findOne({where: {id}});
    }
    
    
    createFeedback(feedback : CreateFeedback){
        feedback.dateCreation = new Date().toISOString();
        feedback.dateUpdate= new Date().toISOString();
       const  newFeedback = this.feedbackRepository.create(feedback);
       return this.feedbackRepository.save(newFeedback);
    }
    
    async updateFeedback(id:string ,feedback: UpdateFeedback): Promise<Feedback>{
        const update = await this.feedbackRepository.findOne({where: {id}});
        this.feedbackRepository.merge(update,feedback);
        return await this.feedbackRepository.save(update);
        }
        
        
        
        delteFeedback(id:string){
            return this.feedbackRepository.delete(id);
        }
        




















}
