import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperAgent } from './superAgent.entity';
import { Repository } from 'typeorm';
import { SuperAgentCreate } from './DTO/superAgentCreate.dto';
import { SuperAgentUpdate } from './DTO/superAgentUpdate.dto';

@Injectable()
export class SuperAgentService {


    constructor(@InjectRepository(SuperAgent) private superagentRepository : Repository<SuperAgent>){}



    findAll(){
        return this.superagentRepository.find();
    }
    
    findOne(id:string){
        return this.superagentRepository.findOne({where: {id}});
    }
    
    
    createSpA(spa : SuperAgentCreate){
        spa.dateCreation = new Date().toISOString();
        spa.dateUpdate= new Date().toISOString();
       const  newSPA = this.superagentRepository.create(spa);
       return this.superagentRepository.save(newSPA);
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
