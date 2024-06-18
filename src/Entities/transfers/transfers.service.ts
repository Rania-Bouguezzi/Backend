import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './transfers.entity';
import { Repository } from 'typeorm';
import { CreateTranfer } from './DTO/tranfersCreate.dto';
import { UpdateTransfer } from './DTO/tranfersUpdate.dto';
import { Agency } from '../agencies/agencies.entity';
import { SuperAgent } from '../super-agent/superAgent.entity';
import { Agent } from '../agent/agent.entity';
import { EtatTransfer, typeStatus } from 'src/Type/Type';
import { Mission } from '../missions/missions.entity';
import { UpdateMission } from '../missions/DTO/missionsUpdate.dto';


@Injectable()
export class TransfersService {


    constructor(@InjectRepository(Transfer) private transferRepository : Repository<Transfer> ,
     @InjectRepository(Agency) private agencyRepository : Repository<Agency>,
     @InjectRepository(Agent) private agentRepository : Repository<Agent>,
     @InjectRepository(Mission) private missionRepository : Repository<Mission>,
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
        
              const {from,to,date_time_Arrive,date_time_Depart,nbrePlacesDisponibles,priceTransferForPerson, note,extra,dateCreation, dateUpdate, nbrePlacesOccupees,agencyId, agentId } = transfer;
              const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
              const agent = await this.agentRepository.findOne({ where: { id: agentId } });
              if (!agency) {
                throw new Error('Agency introuvable');
              }
              const newTransfer = this.transferRepository.create({from,to,date_time_Arrive,date_time_Depart,nbrePlacesDisponibles,priceTransferForPerson, note,extra,  nbrePlacesOccupees,dateCreation, dateUpdate, agency, agent});
              newTransfer.dateCreation =   new Date().toISOString();
              newTransfer.dateUpdate = new Date().toISOString();
              newTransfer.status = typeStatus.ACTIVE;
              newTransfer.etatTransfer= EtatTransfer.DISPO;
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



  async getMission(idTransfer: string) {
   const update =   this.missionRepository.find({
      where: { transfers: { id: idTransfer } }
    });
    
  }


  async UpdateMission(idTransfer: string ,mission: UpdateMission) {
    const update =  await this.missionRepository.findOne({
       where: { transfers: { id: idTransfer } }
     });
     this.missionRepository.merge(update,mission);
     return await this.missionRepository.save(update);
   }
 


}
