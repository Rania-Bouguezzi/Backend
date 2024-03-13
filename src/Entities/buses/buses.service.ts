import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './buses.entity';
import { Repository } from 'typeorm';
import { CreateBus } from './DTO/busesCreate.dto';
import { UpdateBus } from './DTO/busesUpdate.dto';

@Injectable()
export class BusesService {

constructor(@InjectRepository(Bus) private busRepository : Repository<Bus>){}

findAll(){
    return this.busRepository.find();
}

findOne(id:string){
    return this.busRepository.findOne({where: {id}});
}


createBus(bus : CreateBus){
    bus.dateCreation = new Date().toISOString();
    bus.dateUpdate= new Date().toISOString();
   const  newBus = this.busRepository.create(bus);
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
    






}
