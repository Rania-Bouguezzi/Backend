import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { Repository } from 'typeorm';
import { CreateDriver } from './DTO/driversCreation.dto';
import { UpdateDriver } from './DTO/driversUpdate.dto';

@Injectable()
export class DriversService {

    constructor(@InjectRepository(Driver) private driverRepository : Repository<Driver>){}



    findAll(){
        return this.driverRepository.find();
    }
    
    findOne(id:number){
        return this.driverRepository.findOne({where: {id}});
    }
    
    
    createDriver(driver : CreateDriver){
        driver.dateCreation = new Date().toISOString();
        driver.dateUpdate= new Date().toISOString();
       const  newDriver = this.driverRepository.create(driver);
       return this.driverRepository.save(newDriver);
    }
    
    async updateDriver(id:number ,driver: UpdateDriver): Promise<Driver>{
        const update = await this.driverRepository.findOne({where: {id}});
        this.driverRepository.merge(update,driver);
        return await this.driverRepository.save(update);
        }
        
        
        
        delteDriver(id:number){
            return this.driverRepository.delete(id);
        }
        










    
}
