import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './buses.entity';
import { Repository } from 'typeorm';
import { CreateBus } from './DTO/busesCreate.dto';
import { UpdateBus } from './DTO/busesUpdate.dto';
import { Agency } from '../agencies/agencies.entity';
import { SuperAgent } from '../super-agent/superAgent.entity';

@Injectable()
export class BusesService {

constructor(@InjectRepository(Bus) private busRepository : Repository<Bus>,
@InjectRepository(Agency) private agencyRepository : Repository<Agency>,
@InjectRepository(SuperAgent) private spaRepository : Repository<SuperAgent>){}

findAll(){
    return this.busRepository.find({ relations: ['agency' , 'super_agent']}); 
}

findOne(id:string){
    return this.busRepository.findOne({where: {id}, relations:['agency','super_agent']});
}


async createBus(bus : CreateBus){


    const {marque,puissance,matricule,nbrePlaces,dateCreation, dateUpdate,status, agencyId, spaId } = bus;
    const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
    const super_agent = await this.spaRepository.findOne({ where: { id: spaId } });
    if (!agency) {
      throw new Error('Agency introuvable');
    }
    const newBus = this.busRepository.create({marque,puissance,matricule,nbrePlaces,dateCreation, dateUpdate,status, agency, super_agent});
    newBus.dateCreation = new Date().toDateString();
    newBus.dateUpdate = new Date().toDateString();
    return this.busRepository.save(newBus);
}

async updateBus(id:string ,bus: UpdateBus): Promise<Bus>{
    const update = await this.busRepository.findOne({where: {id}});
    this.busRepository.merge(update,bus);
    return await this.busRepository.save(update);
    }
    
    
    
    deleteBus(id:string){
        return this.busRepository.delete(id);
    }
    



    async getBusByAgency(idAgency:string):Promise <Bus[]>{
        return  this.busRepository.find(
              {
                  where : {agency:{id :idAgency}}
              }
          )
      }

      async getBusCountByAgency(idAgency: string): Promise<number> {
        return this.busRepository.count({
          where: { agency: { id: idAgency } }
        });
      }


}
