import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedbacks.entity';
import { Repository } from 'typeorm';
import { CreateFeedback } from './DTO/feedbacksCreate.dto';
import { UpdateFeedback } from './DTO/feedbacksUpdate.dto';
import { typeStatus } from 'src/Type/Type';
import { Agent } from '../agent/agent.entity';
import { Mission } from '../missions/missions.entity';

@Injectable()
export class FeedbacksService {
    constructor(@InjectRepository(Feedback) private feedbackRepository : Repository<Feedback>,
    @InjectRepository(Agent) private agentRepository : Repository<Agent>,
    @InjectRepository(Mission) private missionRepository : Repository<Mission>,
){}



    findAll(){
        return this.feedbackRepository.find({relations: ['agent' , 'agent.agency' , 'mission']});
    }
    
    findOne(id:string){
        return this.feedbackRepository.findOne({where: {id}});
    }
    
    
  async  createFeedback(feedback : CreateFeedback, MissionId: string){
        const {text,dateCreation, dateUpdate,status, agentId, missionId} = feedback;
        const agent = await this.agentRepository.findOne({ where: { id: agentId } });
        const mission = await this.missionRepository.findOne({ where: { id: missionId } });
        if (!agent) {
            throw new Error('Agent introuvable');
          }
          const newFeedback = this.feedbackRepository.create({text,dateCreation,dateUpdate,status, agent, mission});
          newFeedback.dateCreation = new Date().toISOString();
          newFeedback.dateUpdate = new Date().toISOString();
          newFeedback.status = typeStatus.ACTIVE;
          
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
        

async findByMission(idMission : string): Promise<Feedback[]> {
    return this.feedbackRepository.find({
        where: {
            mission: {
                id: idMission 
            }
          },relations:['agent', 'agent.agency', 'mission', ]
      });}



      async countFeedbacks(idAgency : string):  Promise<number> {
        return this.feedbackRepository.count({
             where: {
            mission: {
                agent:{
                    agency:{
                        id : idAgency
                    }
                }
            }
          },
        });
      }


















}
