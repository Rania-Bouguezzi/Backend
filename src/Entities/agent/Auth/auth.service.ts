import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Agent } from '../agent.entity';
import { CreateAgent } from '../DTO/agentCreation.dto';
import { Agency } from 'src/Entities/agencies/agencies.entity';
import { UserType, typeStatus } from 'src/Type/Type';


@Injectable()
export class AuthAgentService {
    constructor(
        @InjectRepository(Agent) private agentsRepository: Repository<Agent>,
        @InjectRepository(Agency)  private readonly agencyRepository: Repository<Agency>,
    ){}

    async creatAgent(agent: CreateAgent): Promise<Agent> {

        /*  agent.dateCreation =   new Date().toISOString();
          agent.dateUpdate = new Date().toISOString();
          const newAgent = this.agentRepository.create(agent);
          newAgent.agency.id = agent.agencyId;
          return this.agentRepository.save(newAgent);*/
      
          const {username,password,firstname,lastname,email,phone,birthDate, picture,address,genre, agencyId } = agent;
      
      
          const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
      
          if (!agency) {
            throw new Error('Agency introuvable');
          }
      
        
         
      
          
          const newAgent = this.agentsRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address, genre, agency});
          newAgent.dateCreation = new Date().toDateString();
          newAgent.dateUpdate = new Date().toDateString();
          newAgent.status = typeStatus.ACTIVE;
          newAgent.role = UserType.AGENT;
          return this.agentsRepository.save(newAgent);
      
      }
    async  find(condition : any) : Promise<Agent>{
        return this.agentsRepository.findOneBy(condition);
    }
    
}
