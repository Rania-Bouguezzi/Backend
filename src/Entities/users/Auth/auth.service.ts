import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from '../DTO/usersCreate.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        
    ){}

    createUser(user: CreateUser){
        const newUser = this.usersRepository.create(user)
        return this.usersRepository.save(newUser)
    }
    async  find(condition : any) : Promise<User>{
        return this.usersRepository.findOneBy(condition);
    }
    
}
