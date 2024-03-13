import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUser } from './DTO/usersCreate.dto';
import { UpdateUser } from './DTO/usersUpdate.dto';

@Injectable()
export class UsersService {

constructor(@InjectRepository(User) private userRepository : Repository<User>){}

finAll()
{
    return this.userRepository.find();
}


findById(id: string){
    const user = this.userRepository.findOne({where: {id}});
    if(!user){
        throw new HttpException('User with' + id+ 'Not Found ', 404);

    }
    return this.userRepository.findOne({where: {id}});
}

createUser (user: CreateUser){
    user.dateCreation = new Date().toISOString();
    user.dateUpdate = new Date().toISOString();
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
}

async updateUser(id: string, user:UpdateUser): Promise<User>{
    const update = await this.userRepository.findOne({where: {id}});
    this.userRepository.merge(update,user);
    return await this.userRepository.save(update);
}
    deleteUser(id:string){
        return this.userRepository.delete(id);
    }
}
