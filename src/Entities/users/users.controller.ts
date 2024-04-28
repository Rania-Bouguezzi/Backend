import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './DTO/usersCreate.dto';
import { UpdateUser } from './DTO/usersUpdate.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthentificationGuard } from './guards/authentification.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { Role } from './decorators/role.decorator';
import { UserType } from 'src/Type/Type';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

@Role([UserType.AGENT, UserType.SUPERAGENT] )
@UseGuards(AuthentificationGuard, AuthorizationGuard)    
@Get()
finAll(@Req() {user} ){
    console.log(user);
    return this.userService.finAll();

}

@Get(':id')
findById(@Param('id') id : string){
    return this.userService.findById(id);
}

@Post('add')
createUser(@Body() user: CreateUser){
    return this.userService.createUser(user);
}

@Patch(':id')
updateUser(@Param('id') id:string, @Body() user:UpdateUser)
{   const newUser = this.userService.findById(id);
    if(!newUser){
        throw new HttpException('User with' +id + 'Not Found !' , 404);
    }
    return this.userService.updateUser(id,user);
}

@Delete(':id')
deleteUser(@Param('id') id : string){
    const user = this.userService.findById(id)
    if (!user) {
        throw new HttpException('User not found ', 404)
    
    }
   return this.userService.deleteUser(id)
}













}
