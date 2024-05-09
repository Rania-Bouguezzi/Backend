import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './transfers.entity';
import { Repository } from 'typeorm';
import { CreateTranfer } from './DTO/tranfersCreate.dto';
import { UpdateTransfer } from './DTO/tranfersUpdate.dto';
import { Agency } from '../agencies/agencies.entity';
import { SuperAgent } from '../super-agent/superAgent.entity';
import { Agent } from '../agent/agent.entity';


@Injectable()
export class TransfersService {


    constructor(@InjectRepository(Transfer) private transferRepository : Repository<Transfer> ,
     @InjectRepository(Agency) private agencyRepository : Repository<Agency>,
     @InjectRepository(Agent) private agentRepository : Repository<Agent>,
    ){}
 


    findAll(){
        return this.transferRepository.find({ relations: ['agency', 'agent', 'mission']});
    }
    
    findOne(id:string){
        return this.transferRepository.findOne({where: {id} , relations:['agency', 'agent', 'mission']});
    }
    
    

    
    async updateTransfer(id:string ,transfer: UpdateTransfer): Promise<Transfer>{
        const update = await this.transferRepository.findOne({where: {id}});
        this.transferRepository.merge(update,transfer);
        return await this.transferRepository.save(update);
        }
        
   
        
        delteTransferr(id:string){
            return this.transferRepository.delete(id);
        }
        


        async creatTransfert(transfer: CreateTranfer): Promise<Transfer> {
        
              const {from,to,date_time_Arrive,date_time_Depart,nbrePlacesDisponibles,priceTransferForPerson,etatTransfer, note,extra,dateCreation, dateUpdate,status, agencyId, agentId } = transfer;
              const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
              const agent = await this.agentRepository.findOne({ where: { id: agentId } });
              if (!agency) {
                throw new Error('Agency introuvable');
              }
              const newTransfer = this.transferRepository.create({from,to,date_time_Arrive,date_time_Depart,nbrePlacesDisponibles,priceTransferForPerson,etatTransfer, note,extra,dateCreation, dateUpdate,status, agency, agent});
              newTransfer.dateCreation =   new Date().toISOString();
              newTransfer.dateUpdate = new Date().toISOString();
              return this.transferRepository.save(newTransfer);
          }


 async getTransferByAgency(idAgency:string):Promise <Transfer[]>{
  return  this.transferRepository.find(
        {
            where : {agency:{id :idAgency}}
        }
    )
}



async getTransferCountByAgency(idAgency: string): Promise<number> {
    return this.transferRepository.count({
      where: { agency: { id: idAgency } }
    });
  }


  async getSharedTransfer():Promise <Transfer[]>{
    return  this.transferRepository.find(
          {
              where : {isShared:true},
              relations:['agency', 'agent']
          }
      )
  }











}
