import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperAgent } from './superAgent.entity';
import { Repository } from 'typeorm';
import { SuperAgentCreate } from './DTO/superAgentCreate.dto';
import { SuperAgentUpdate } from './DTO/superAgentUpdate.dto';
import { Agency } from '../agencies/agencies.entity';
import { UserType, typeStatus } from 'src/Type/Type';

@Injectable()
export class SuperAgentService {


    constructor(@InjectRepository(SuperAgent) private superagentRepository : Repository<SuperAgent>,
    @InjectRepository(Agency) private agencyRepository : Repository<Agency>){}



    findAll(){
        return this.superagentRepository.find({relations: ['agency']});
    }
    
    findOne(id:string){
        return this.superagentRepository.findOne({where: {id}, relations :['agency']});
    }
    
    
 async   createSpA(spa : SuperAgentCreate) : Promise<SuperAgent>{
    const {username,password,firstname,lastname,email,phone,birthDate, picture,address,status, role,genre, agencyId } = spa;
    const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
    if (!agency) {
      throw new Error('Agency introuvable');
    } 
    const newAgent = this.superagentRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency});
    newAgent.dateCreation = new Date().toDateString();
    newAgent.dateUpdate = new Date().toDateString();
    newAgent.role= UserType.SUPERAGENT;
    newAgent.status= typeStatus.ACTIVE;
    return this.superagentRepository.save(newAgent);
}
async  find(condition : any) : Promise<SuperAgent>{
    return this.superagentRepository.findOneBy(condition);
}

    async updateSpa(id:string ,spa: SuperAgentUpdate): Promise<SuperAgent>{
        const update = await this.superagentRepository.findOne({where: {id}});
        this.superagentRepository.merge(update,spa);
        return await this.superagentRepository.save(update);
        }
        
        
        
        delteSpa(id:string){
            return this.superagentRepository.delete(id);
        }
        


















}
