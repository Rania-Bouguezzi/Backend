

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from '../DTO/usersCreate.dto';
import { Customer } from 'src/Entities/customers/customer.entity';
import { Driver } from 'src/Entities/drivers/driver.entity';
import { Agent } from 'src/Entities/agent/agent.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Customer) private customersRepository: Repository<Customer>,
        @InjectRepository(Driver) private driversRepository: Repository<Driver>,
        @InjectRepository(Agent) private agentsRepository: Repository<Agent>,
        
    ){}

    createUser(user: CreateUser){
        const newUser = this.usersRepository.create(user)
        return this.usersRepository.save(newUser)
    }

    async getAllEntities(condition: any): Promise<any[]> {
        const users = await this.usersRepository.find({ where: condition });
        const customers = await this.customersRepository.find({ where: condition });
        const drivers = await this.driversRepository.find({ where: condition });
        const agents = await this.agentsRepository.find({ where: condition });

        // Combine toutes les entités dans une seule liste
        const allEntities = [...users, ...customers, ...drivers, ...agents];

        return allEntities;
    }
    async getAllUsers(): Promise<any[]> {
        const users = await this.usersRepository.find();
        const customers = await this.customersRepository.find();
        const drivers = await this.driversRepository.find();
        const agents = await this.agentsRepository.find();

        // Combine toutes les entités dans une seule liste
        const allEntities = [...users, ...customers, ...drivers, ...agents];

        return allEntities;
    }


    }
    

