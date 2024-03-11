import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { SuperAgentService } from './super-agent.service';
import { SuperAgentCreate } from './DTO/superAgentCreate.dto';
import { SuperAgentUpdate } from './DTO/superAgentUpdate.dto';

@Controller('super-agent')
export class SuperAgentController {
    constructor(private readonly superAgentService : SuperAgentService){}
    @Get(':id')
findById(@Param('id') id : number){
    return this.superAgentService.findOne(id);
}

@Post('add')
createSPA(@Body() spa: SuperAgentCreate){
    return this.superAgentService.createSpA(spa);
}

@Patch('id')
updateSPA(@Param('id') id:number, @Body() spa:SuperAgentUpdate)
{   const newSpa = this.superAgentService.findOne(id);
    if(!newSpa){
        throw new HttpException('Super Agent with' +id + 'Not Found !' , 404);
    }
    return this.superAgentService.updateSpa(id,spa);
}

@Delete(':id')
deleteSPA(@Param('id') id : number){
    const spa = this.superAgentService.findOne(id)
    if (!spa) {
        throw new HttpException('Super Agent not found ', 404)
    
    }
   return this.superAgentService.delteSpa(id)
}



}
