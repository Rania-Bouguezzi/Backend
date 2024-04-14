import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomer } from './DTO/customersCreate.dto';
import { UpdateCustomer } from './DTO/customersUpdate.dto';
import { Agency } from '../agencies/agencies.entity';

@Injectable()
export class CustomersService {
constructor(@InjectRepository(Customer) private customerRepository : Repository<Customer>){}



findAll(){
    return this.customerRepository.find({ relations: ['agency']});
}

findOne(id:string){
    return this.customerRepository.findOne({where: {id}});
}


async createCustomer(agent: CreateCustomer): Promise<Customer> {

  
  
      const {username,password,firstname,lastname,email,phone,birthDate, picture,address,status, role,genre, agencyId } = agent;
  
  
      const agency = await this.customerRepository.findOne({ where: { id: agencyId } });
  
      if (!agency) {
        throw new Error('Agency introuvable');
      }
  
    
     
  
      
      const newAgent = this.customerRepository.create({username,password,firstname,lastname,email,phone,birthDate, picture,address,status,role, genre, agency});
  newAgent.dateCreation = new Date().toDateString();
  newAgent.dateUpdate = new Date().toDateString();
      return this.customerRepository.save(newAgent);
  
  }
async updateCustomer(id:string ,customer: UpdateCustomer): Promise<Customer>{
    const update = await this.customerRepository.findOne({where: {id}});
    this.customerRepository.merge(update,customer);
    return await this.customerRepository.save(update);
    }
    
    
    
    deleteCustomer(id:string){
        return this.customerRepository.delete(id);
    }
    
    async getCustomerByAgency(idAgency:string):Promise <Customer[]>{
        return  this.customerRepository.find(
              {
                  where : {agency:{id :idAgency}}
              }
          )
      }





}
