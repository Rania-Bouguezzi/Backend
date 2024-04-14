import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgent } from './DTO/agentCreation.dto';
import { UpdateAgent } from './DTO/agentUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('agent')
@ApiTags('Agent')
export class AgentController {

constructor(private readonly agentService : AgentService){

}


@Get()
findAll(){
return this.agentService.findAll();
}

@Get(':id')
findById(@Param('id') id : string){
    const agent = this.agentService.findOne(id);
    if(!agent){
        throw new HttpException('Agent with' + id + 'Not Found !', 404);
    } 
    return this.agentService.findOne(id);
}

@Post('add')
createAgent(@Body() agent: CreateAgent){
    return this.agentService.creatAgent(agent);
}
@Patch(':id')
updateAgent(@Param ('id') id:string, @Body() agent: UpdateAgent){
  const newagent = this.agentService.findOne(id)

  if(!newagent){
    throw new HttpException('agent not found', 404)
  }

  return this.agentService.updateAgent(id,agent)  
}

@Delete(':id')
deleteAgent(@Param('id') id : string){
    const agent = this.agentService.findOne(id)
    if (!agent) {
        throw new HttpException('Agent not found ', 404)
    
    }
   return this.agentService.deleteAgent(id)
}


@Get('agency/:id')
getAgentByAgency(@Param('id') id : string){
    return this.agentService.getAgentByAgency(id);
}

@Get('agentsNumber/agency/:id')
getAgentNumber(@Param('id') idAgency:string){
return this.agentService.getAgentCountByAgency(idAgency)
}


}
