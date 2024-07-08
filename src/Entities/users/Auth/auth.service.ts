

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from '../DTO/usersCreate.dto';
import { Customer } from 'src/Entities/customers/customer.entity';
import { Driver } from 'src/Entities/drivers/driver.entity';
import { Agent } from 'src/Entities/agent/agent.entity';
import { SuperAgent } from 'src/Entities/super-agent/superAgent.entity';
import { typeStatus } from 'src/Type/Type';
import { Agency } from 'src/Entities/agencies/agencies.entity';
import { UpdateUser } from '../DTO/usersUpdate.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Customer) private customersRepository: Repository<Customer>,
        @InjectRepository(Driver) private driversRepository: Repository<Driver>,
        @InjectRepository(Agent) private agentsRepository: Repository<Agent>,
        @InjectRepository(SuperAgent) private superagentRepository: Repository<SuperAgent>,
        @InjectRepository(Agency) private agencyRepository: Repository<Agency>,
        
    ){}

    createUser(user: CreateUser){
        const newUser = this.usersRepository.create(user);
        newUser.dateCreation = new Date().toDateString();
        newUser.dateUpdate = new Date().toDateString();
        newUser.status = typeStatus.ACTIVE;
        return this.usersRepository.save(newUser)
    }

    async getAllEntities(condition: any): Promise<any[]> {
        const users = await this.usersRepository.find({ where: condition });
        const customers = await this.customersRepository.find({ where: condition });
        const drivers = await this.driversRepository.find({ where: condition });
        const agents = await this.agentsRepository.find({ where: condition });
        const spa = await this.superagentRepository.find({ where: condition });

        // Combine toutes les entités dans une seule liste
        const allEntities = [...users, ...customers, ...drivers, ...agents, ...spa];

        return allEntities;
    }
    async getAllUsers(): Promise<any[]> {
        const users = await this.usersRepository.find();
     //   const customers = await this.customersRepository.find({relations:['agency']});
        const drivers = await this.driversRepository.find({where: {status: typeStatus.ACTIVE}, relations:['agency']});
        const agents = await this.agentsRepository.find({where: {status: typeStatus.ACTIVE},relations:['agency']});
        const superAgent = await this.superagentRepository.find({where: {status: typeStatus.ACTIVE},relations:['agency']});
     

        const allEntities = [...users, ...drivers, ...agents, ...superAgent];

        return allEntities;
    }
async getById(id:string)  {
   
    const customers = await this.customersRepository.find({where: {id },relations:['agency']});
    const drivers = await this.driversRepository.find({where: {id },relations:['agency']});
    const agents = await this.agentsRepository.find({where: {id },relations:['agency']});
    const superAgent = await this.superagentRepository.find({where: {id },relations:['agency']});
 


    const allEntities = [...customers, ...drivers, ...agents, ...superAgent];
  const userById = allEntities.find(entity => entity.id === id);
  return userById; 
}


async getAdmin(condition: any){
    const admin = await this.usersRepository.find({ where: condition });
    return admin;
}

async getAdminById(id:string){
    const admin = await this.usersRepository.findOne({ where: { id } });
    return admin;    
}

 async deleteUser(id:string){
    const customers = await this.customersRepository.find({where: {id },relations:['agency']});
    const drivers = await this.driversRepository.find({where: {id },relations:['agency']});
    const agents = await this.agentsRepository.find({where: {id },relations:['agency']});
    const superAgent = await this.superagentRepository.find({where: {id },relations:['agency']});
    const allEntities = [...customers, ...drivers, ...agents, ...superAgent];
    const userById = allEntities.find(entity => entity.id === id);
  
  
}



async findAllUsers(): Promise<any[]> {
    const drivers = await this.driversRepository.find({where: {status: typeStatus.ACTIVE}, relations:['agency']});
    const agents = await this.agentsRepository.find({where: {status: typeStatus.ACTIVE},relations:['agency']});
    const superAgent = await this.superagentRepository.find({where: {status: typeStatus.ACTIVE},relations:['agency']});
 

    const allEntities = [...drivers, ...agents, ...superAgent];

    return allEntities;
}

async updateUser(id: string, updateUserDto: UpdateUser): Promise<any> {
    const driver = await this.driversRepository.findOne({ where: { id }, relations: ['agency'] });
    if (driver) {
      await this.driversRepository.update(id, updateUserDto);
      return await this.driversRepository.findOne({ where: { id }, relations: ['agency'] });
    }

    const agent = await this.agentsRepository.findOne({ where: { id }, relations: ['agency'] });
    if (agent) {
      await this.agentsRepository.update(id, updateUserDto);
      return await this.agentsRepository.findOne({ where: { id }, relations: ['agency'] });
    }

    const superAgent = await this.superagentRepository.findOne({ where: { id }, relations: ['agency'] });
    if (superAgent) {
      await this.superagentRepository.update(id, updateUserDto);
      return await this.superagentRepository.findOne({ where: { id }, relations: ['agency'] });
    }

    throw new NotFoundException('User not found');
  }

  async getAllAll(): Promise<any[]> {
    const drivers = await this.driversRepository.find({relations:['agency']});
    const agents = await this.agentsRepository.find({relations:['agency']});
    const superAgent = await this.superagentRepository.find({relations:['agency']});
 

    const allEntities = [...drivers, ...agents, ...superAgent];

    return allEntities;
}


    }
    

