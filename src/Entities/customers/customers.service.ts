import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomer } from './DTO/customersCreate.dto';
import { UpdateCustomer } from './DTO/customersUpdate.dto';

@Injectable()
export class CustomersService {
constructor(@InjectRepository(Customer) private customerRepository : Repository<Customer>){}



findAll(){
    return this.customerRepository.find();
}

findOne(id:string){
    return this.customerRepository.findOne({where: {id}});
}


createCustomer(customer : CreateCustomer){
    customer.dateCreation = new Date().toISOString();
    customer.dateUpdate= new Date().toISOString();
   const  newCustomer = this.customerRepository.create(customer);
   return this.customerRepository.save(newCustomer);
}

async updateCustomer(id:string ,customer: UpdateCustomer): Promise<Customer>{
    const update = await this.customerRepository.findOne({where: {id}});
    this.customerRepository.merge(update,customer);
    return await this.customerRepository.save(update);
    }
    
    
    
    deleteCustomer(id:string){
        return this.customerRepository.delete(id);
    }
    



}
