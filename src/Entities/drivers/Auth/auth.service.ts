import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Driver } from '../driver.entity';
import { CreateDriver } from '../DTO/driversCreation.dto';
import { UserType, typeStatus } from 'src/Type/Type';
import { Agency } from 'src/Entities/agencies/agencies.entity';


@Injectable()
export class AuthDriverService {
    constructor(
        @InjectRepository(Driver) private driversRepository: Repository<Driver>,
        @InjectRepository(Agency) private agencyRepository : Repository<Agency>,
        
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


    async createDriver(agent: CreateDriver): Promise<Driver> {

        /*  agent.dateCreation =   new Date().toISOString();
          agent.dateUpdate = new Date().toISOString();
          const newAgent = this.agentRepository.create(agent);
          newAgent.agency.id = agent.agencyId;
          return this.agentRepository.save(newAgent);*/
      
          const {username,password,firstname,lastname,email,phone,birthDate, picture,address,status, role,genre, agencyId } = agent;
      
      
          const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
      
          if (!agency) {
            throw new Error('Agency introuvable');
          }
      
        
         
      
          
          const newAgent = this.driversRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency});
      newAgent.dateCreation = new Date().toDateString();
      newAgent.dateUpdate = new Date().toDateString();
      newAgent.status= typeStatus.ACTIVE;
      newAgent.role = UserType.DRIVER;
          return this.driversRepository.save(newAgent);
      
      }
  
    
}
