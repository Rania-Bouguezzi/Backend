import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { Repository } from 'typeorm';
import { CreateDriver } from './DTO/driversCreation.dto';
import { UpdateDriver } from './DTO/driversUpdate.dto';
import { Agency } from '../agencies/agencies.entity';
import { SuperAgent } from '../super-agent/superAgent.entity';
import { UserType } from 'src/Type/Type';

@Injectable()
export class DriversService {

    constructor(@InjectRepository(Driver) private driverRepository : Repository<Driver>, 
    @InjectRepository(Agency) private agencyRepository : Repository<Agency>,
    @InjectRepository(SuperAgent) private spaRepository : Repository<SuperAgent>){}



    findAll(){
        return this.driverRepository.find({ relations: ['agency', 'super_agent']});
    }
    
    findOne(id:string){
        return this.driverRepository.findOne({where: {id}, relations: ['agency', 'super_agent']});
    }
    
    

    async createDriver(agent: CreateDriver): Promise<Driver> {
        const {username,password,firstname,lastname,email,phone,birthDate, picture,address,status, role,genre, agencyId, spaId } = agent;
        const agency = await this.agencyRepository.findOne({ where: { id: agencyId } });
        const super_agent = await this.spaRepository.findOne({ where: { id: spaId } });
    
        if (!agency) {
          throw new Error('Agency introuvable');
        }
    
        const newAgent = this.driverRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency, super_agent});
    newAgent.dateCreation = new Date().toDateString();
    newAgent.dateUpdate = new Date().toDateString();
    newAgent.role=UserType.DRIVER;
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
