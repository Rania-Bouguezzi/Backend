import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Driver } from '../driver.entity';
import { CreateDriver } from '../DTO/driversCreation.dto';
import { UserType, typeStatus } from 'src/Type/Type';
import { Agency } from 'src/Entities/agencies/agencies.entity';
import { SuperAgent } from 'src/Entities/super-agent/superAgent.entity';


@Injectable()
export class AuthDriverService {
    constructor(
        @InjectRepository(Driver) private driversRepository: Repository<Driver>,
        @InjectRepository(Agency) private agencyRepository : Repository<Agency>,
        @InjectRepository(SuperAgent) private spaRepository : Repository<SuperAgent>
        
    ){}

    createUser(driver: CreateDriver){
        driver.dateCreation = new Date().toISOString();
        driver.dateUpdate= new Date().toISOString();
        driver.status= typeStatus.ACTIVE;
        driver.role = UserType.DRIVER;
        const newDriver = this.driversRepository.create(driver)
        return this.driversRepository.save(newDriver)
    }
    async  find(condition : any) : Promise<Driver>{
        return this.driversRepository.findOneBy(condition);
    }


    async createDriver(driver: CreateDriver): Promise<Driver> {
      
          const {username,password,firstname,lastname,email,phone,birthDate, picture,address,status, role,genre, agencyId, spaId } = driver;
          const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
          const super_agent = await this.spaRepository.findOne({ where: { id: spaId } });
          if (!agency) {
            throw new Error('Agency introuvable');
          }
          const newAgent = this.driversRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency, super_agent});
      newAgent.dateCreation = new Date().toDateString();
      newAgent.dateUpdate = new Date().toDateString();
      newAgent.status= typeStatus.ACTIVE;
      newAgent.role = UserType.DRIVER;
          return this.driversRepository.save(newAgent);
      
      }
  
    
}
