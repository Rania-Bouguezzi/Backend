import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Agent } from '../agent.entity';
import { CreateAgent } from '../DTO/agentCreation.dto';


@Injectable()
export class AuthAgentService {
    constructor(
        @InjectRepository(Agent) private agentsRepository: Repository<Agent>,
        
    ){}

    createUser(agent: CreateAgent){
        agent.dateCreation = new Date().toISOString();
        agent.dateUpdate= new Date().toISOString();
        const newAgent = this.agentsRepository.create(agent)
        return this.agentsRepository.save(newAgent)
    }
    async  find(condition : any) : Promise<Agent>{
        return this.agentsRepository.findOneBy(condition);
    }
    
}
