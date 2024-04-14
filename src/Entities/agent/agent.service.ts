import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { Repository } from 'typeorm';
import { CreateAgent } from './DTO/agentCreation.dto';
import { UpdateAgent } from './DTO/agentUpdate.dto';
import { Agency } from '../agencies/agencies.entity';

@Injectable()
export class AgentService {

constructor(@InjectRepository(Agent) private agentRepository: Repository <Agent>,   @InjectRepository(Agency)
private readonly agencyRepository: Repository<Agency>,){}

findAll(){
    return this.agentRepository.find({ relations: ['agency']});
}


    async findOne(id: string) {
        return this.agentRepository.findOne({ where: { id }, relations: ['agency'] });
    }
    


async getAgentByAgency(idAgency:string):Promise <Agent[]>{
    return  this.agentRepository.find(
          {
              where : {agency:{id :idAgency}}
          }
      )
  }



async creatAgent(agent: CreateAgent): Promise<Agent> {

  /*  agent.dateCreation =   new Date().toISOString();
    agent.dateUpdate = new Date().toISOString();
    const newAgent = this.agentRepository.create(agent);
    newAgent.agency.id = agent.agencyId;
    return this.agentRepository.save(newAgent);*/

    const {username,password,firstname,lastname,email,phone,birthDate, picture,address,status, role,genre, agencyId } = agent;


    const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });

    if (!agency) {
      throw new Error('Agency introuvable');
    }

  
   

    
    const newAgent = this.agentRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency});
newAgent.dateCreation = new Date().toDateString();
newAgent.dateUpdate = new Date().toDateString();
    return this.agentRepository.save(newAgent);

}

async updateAgent(id:string ,agent: UpdateAgent): Promise<Agent>{
const update = await this.agentRepository.findOne({where: {id}});
this.agentRepository.merge(update,agent);
return await this.agentRepository.save(update);
}



deleteAgent(id:string){
    return this.agentRepository.delete(id);
}


async getAgentCountByAgency(idAgency: string): Promise<number> {
    return this.agentRepository.count({
      where: { agency: { id: idAgency } }
    });
  }


}
