import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { Repository } from 'typeorm';
import { CreateAgent } from './DTO/agentCreation.dto';
import { UpdateAgent } from './DTO/agentUpdate.dto';
import { Agency } from '../agencies/agencies.entity';
import { SuperAgent } from '../super-agent/superAgent.entity';

@Injectable()
export class AgentService {

constructor(@InjectRepository(Agent) private agentRepository: Repository <Agent>,   @InjectRepository(Agency)
private readonly agencyRepository: Repository<Agency>,
@InjectRepository(SuperAgent) private spaRepository : Repository<SuperAgent>){}

findAll(){
    return this.agentRepository.find({ relations: ['agency', 'super_agent']});
}


    async findOne(id: string) {
        return this.agentRepository.findOne({ where: { id }, relations: ['agency', 'super_agent'] });
    }
    


async getAgentByAgency(idAgency:string):Promise <Agent[]>{
    return  this.agentRepository.find(
          {
              where : {agency:{id :idAgency}}
          }
      )
  }



async creatAgent(agent: CreateAgent): Promise<Agent> {
    const {username,password,firstname,lastname,email,phone,birthDate, picture,address,status, role,genre, agencyId, spaId } = agent;
    const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
    const super_agent = await this.spaRepository.findOne({ where: { id: spaId } });
    if (!agency) {
      throw new Error('Agency introuvable');
    } 
    const newAgent = this.agentRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency, super_agent});
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
