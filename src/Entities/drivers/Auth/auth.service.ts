import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Driver } from '../driver.entity';
import { CreateDriver } from '../DTO/driversCreation.dto';


@Injectable()
export class AuthDriverService {
    constructor(
        @InjectRepository(Driver) private driverssRepository: Repository<Driver>,
        
    ){}

    createUser(driver: CreateDriver){
        driver.dateCreation = new Date().toISOString();
        driver.dateUpdate= new Date().toISOString();
        const newDriver = this.driverssRepository.create(driver)
        return this.driverssRepository.save(newDriver)
    }
    async  find(condition : any) : Promise<Driver>{
        return this.driverssRepository.findOneBy(condition);
    }
    
}
