import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { CreateMission } from './DTO/missionsCreate.dto';
import { UpdateMission } from './DTO/missionsUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('missions')
@ApiTags('Mission')
export class MissionsController {

    constructor(private readonly missionService : MissionsService){}

    @Get(':id')
findById(@Param('id') id : string){
    return this.missionService.findOne(id);
}

@Post('add')
createMission(@Body() mission: CreateMission){
    return this.missionService.createMission(mission);
}

@Patch('id')
updateMission(@Param('id') id:string, @Body() mission:UpdateMission)
{ const newMission = this.missionService.findOne(id);
    
    if(!newMission){
      throw new HttpException('Mission not found', 404)
    }
  
    return this.missionService.updateMission(id,mission)  
}

@Delete(':id')
deleteMission(@Param('id') id : string){
    const mission = this.missionService.findOne(id)
    if (!mission) {
        throw new HttpException('Mission not found ', 404)
    
    }
   return this.missionService.delteMission(id)
}







}
