import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Agent } from '../agent.entity';
import { CreateAgent } from '../DTO/agentCreation.dto';
import { Agency } from 'src/Entities/agencies/agencies.entity';
import { UserType, typeStatus } from 'src/Type/Type';
import { SuperAgent } from 'src/Entities/super-agent/superAgent.entity';


@Injectable()
export class AuthAgentService {
    constructor(
        @InjectRepository(Agent) private agentsRepository: Repository<Agent>,
        @InjectRepository(Agency)  private readonly agencyRepository: Repository<Agency>,
        @InjectRepository(SuperAgent) private readonly spaRepository : Repository<SuperAgent>
    ){}

    async creatAgent(agent: CreateAgent): Promise<Agent> {
      
          const {username,password,firstname,lastname,email,phone,birthDate, picture,address,genre, agencyId, spaId } = agent;
      
      
          const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
          const super_agent = await this.spaRepository.findOne({ where: { id: spaId } });
          if (!agency) {
            throw new Error('Agency introuvable');
          }

          const newAgent = this.agentsRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address, genre, agency, super_agent});
          newAgent.dateCreation = new Date().toDateString();
          newAgent.dateUpdate = new Date().toDateString();
          newAgent.status = typeStatus.ACTIVE;
          newAgent.role = UserType.AGENT;
          return this.agentsRepository.save(newAgent);
      
      }
    async  find(condition : any) : Promise<Agent>{
        return this.agentsRepository.findOneBy(condition);
    }
    async findOne(id: string) {
        return this.agentsRepository.findOne({ where: { id }, relations: ['agency', 'super_agent'] });
    }
    
    
}
