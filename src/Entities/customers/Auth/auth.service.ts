import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Customer } from '../customer.entity';
import { CreateCustomer } from '../DTO/customersCreate.dto';


@Injectable()
export class AuthCustomerService {
    constructor(
        @InjectRepository(Customer) private customersRepository: Repository<Customer>,
        
    ){}

    createUser(customer: CreateCustomer){
        customer.dateCreation = new Date().toISOString();
        customer.dateUpdate= new Date().toISOString();
        const newCustomer = this.customersRepository.create(customer)

        return this.customersRepository.save(newCustomer)
    }
    async  find(condition : any) : Promise<Customer>{
        return this.customersRepository.findOneBy(condition);
    }
    
}
