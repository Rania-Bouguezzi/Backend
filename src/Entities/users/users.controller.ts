import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './DTO/usersCreate.dto';
import { UpdateUser } from './DTO/usersUpdate.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

@Get()
finAll(){
    return this.userService.finAll();

}

@Get(':id')
findById(@Param('id') id : number){
    return this.userService.findById(id);
}

@Post('add')
createUser(@Body() user: CreateUser){
    return this.userService.createUser(user);
}

@Patch('id')
updateUser(@Param('id') id:number, @Body() user:UpdateUser)
{   const newUser = this.userService.findById(id);
    if(!newUser){
        throw new HttpException('User with' +id + 'Not Found !' , 404);
    }
    return this.userService.updateUser(id,user);
}

@Delete(':id')
deleteUser(@Param('id') id : number){
    const user = this.userService.findById(id)
    if (!user) {
        throw new HttpException('User not found ', 404)
    
    }
   return this.userService.deleteUser(id)
}













}
