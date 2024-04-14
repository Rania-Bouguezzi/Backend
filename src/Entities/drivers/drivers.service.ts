import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { Repository } from 'typeorm';
import { CreateDriver } from './DTO/driversCreation.dto';
import { UpdateDriver } from './DTO/driversUpdate.dto';
import { Agency } from '../agencies/agencies.entity';

@Injectable()
export class DriversService {

    constructor(@InjectRepository(Driver) private driverRepository : Repository<Driver>, 
    @InjectRepository(Agency) private agencyRepository : Repository<Agency>,){}



    findAll(){
        return this.driverRepository.find({ relations: ['agency']});
    }
    
    findOne(id:string){
        return this.driverRepository.findOne({where: {id}});
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
    
      
       
    
        
        const newAgent = this.driverRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency});
    newAgent.dateCreation = new Date().toDateString();
    newAgent.dateUpdate = new Date().toDateString();
        return this.driverRepository.save(newAgent);
    
    }
    async updateDriver(id:string ,driver: UpdateDriver): Promise<Driver>{
        const update = await this.driverRepository.findOne({where: {id}});
        this.driverRepository.merge(update,driver);
        return await this.driverRepository.save(update);
        }
        
        
        
        delteDriver(id:string){
            return this.driverRepository.delete(id);
        }
        





    
        async getDriverByAgency(idAgency:string):Promise <Driver[]>{
            return  this.driverRepository.find(
                  {
                      where : {agency:{id :idAgency}}
                  }
              )
          }

          async getDriversCountByAgency(idAgency: string): Promise<number> {
            return this.driverRepository.count({
              where: { agency: { id: idAgency } }
            });
          }
        


    
}
