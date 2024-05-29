import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { SuperAgentService } from './super-agent.service';
import { SuperAgentCreate } from './DTO/superAgentCreate.dto';
import { SuperAgentUpdate } from './DTO/superAgentUpdate.dto';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Controller('super-agent')
@ApiTags('Super Agent ')
export class SuperAgentController {

    constructor(private readonly superAgentService : SuperAgentService,private jwtService: JwtService,
        private readonly configService: ConfigService){}
    @Get('')
    findSuperAgent(){
        return this.superAgentService.findAll();
    }
    @Get(':id')
findById(@Param('id') id : string){
    return this.superAgentService.findOne(id);
}
@Post('register')
async Register(@Body() agent:SuperAgentCreate){

      const hashedPassword =  await bcrypt.hash(agent.password, 12);
      console.log(hashedPassword);
      agent.password=hashedPassword;
      return this.superAgentService.createSpA(agent)
  }



@Patch(':id')
updateSPA(@Param('id') id:string, @Body() spa:SuperAgentUpdate)
{   const newSpa = this.superAgentService.findOne(id);
    if(!newSpa){
        throw new HttpException('Super Agent with' +id + 'Not Found !' , 404);
    }
    return this.superAgentService.updateSpa(id,spa);
}

@Delete(':id')
deleteSPA(@Param('id') id : string){
    const spa = this.superAgentService.findOne(id)
    if (!spa) {
        throw new HttpException('Super Agent not found ', 404)
    
    }
   return this.superAgentService.delteSpa(id)
}

@Get('agency/:id')
getSpaByAgency(@Param('id') id : string){
  return this.superAgentService.findSpaByAgency(id);

}

}