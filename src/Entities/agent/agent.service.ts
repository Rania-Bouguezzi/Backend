import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { Repository } from 'typeorm';
import { CreateAgent } from './DTO/agentCreation.dto';
import { UpdateAgent } from './DTO/agentUpdate.dto';

@Injectable()
export class AgentService {

constructor(@InjectRepository(Agent) private agentRepository: Repository <Agent>){}

findAll(){
    return this.agentRepository.find();
}

findOne(id:number){
    return this.agentRepository.findOne({where: {id}});
}


creatAgent(agent: CreateAgent){
    agent.dateCreation =   new Date().toISOString();
    agent.dateUpdate = new Date().toISOString();
    const newAgent = this.agentRepository.create(agent);
    return this.agentRepository.save(newAgent);
}

async updateAgent(id:number ,agent: UpdateAgent): Promise<Agent>{
const update = await this.agentRepository.findOne({where: {id}});
this.agentRepository.merge(update,agent);
return await this.agentRepository.save(update);
}



deleteAgent(id:number){
    return this.agentRepository.delete(id);
}



}
