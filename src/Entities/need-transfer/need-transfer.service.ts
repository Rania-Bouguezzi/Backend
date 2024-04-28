import { Injectable } from '@nestjs/common';
import { NeedTransfer } from './need-transfer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agency } from '../agencies/agencies.entity';
import { Agent } from '../agent/agent.entity';
import { NeedTransferCreate } from './DTO/needTransferCreate.dto';
import { NeedTransferUpdate } from './DTO/needTransferUpdate.dto';

@Injectable()
export class NeedTransferService {

    constructor(@InjectRepository(NeedTransfer) private needTransferRepository: Repository <NeedTransfer>,
    @InjectRepository(Agency) private readonly agencyRepository: Repository<Agency>,
    @InjectRepository(Agent) private agentRepository : Repository<Agent>){}


    findAll(){
        return this.needTransferRepository.find({ relations: ['agency','agent']});
    }
    
    
        async findOne(id: string) {
            return this.needTransferRepository.findOne({ where: { id } , relations: ['agency', 'agent']});
        }


        async getNeedTransferByAgency(idAgency:string):Promise <NeedTransfer[]>{
            return  this.needTransferRepository.find(
                  {
                      where : {agency:{id :idAgency}}, relations: ['agency', 'agent']
                  }
              )
          }
        
        


          async creatTransfer(need: NeedTransferCreate): Promise<NeedTransfer> {
            const {text , agencyId, agentId} = need;
            const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
            const agent = await this.agentRepository.findOne({ where: { id: agentId } });
            if (!agency) {
              throw new Error('Agency introuvable');
            } 
            const newTransfer = this.needTransferRepository.create({text, agency, agent});
            newTransfer.dateCreation =   new Date().toISOString();
            return this.needTransferRepository.save(newTransfer);
        }



        async updateTransfer(id:string ,need: NeedTransferUpdate): Promise<NeedTransfer>{
            const update = await this.needTransferRepository.findOne({where: {id}});
            this.needTransferRepository.merge(update,need);
            return await this.needTransferRepository.save(update);
            }
            
            
            
            deleteTransfer(id:string){
                return this.needTransferRepository.delete(id);
            }
            
        
    
}
