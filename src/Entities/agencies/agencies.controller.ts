import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgency } from './DTO/agenciesCreate.dto';
import { UpdateAgency } from './DTO/agenciesUpdate.dto';

@Controller('agencies')
export class AgenciesController {

constructor(private readonly agencyService: AgenciesService){}

@Get()
findAll(){
    return this.agencyService.findAll()
}

@Get(':id')
findOne(@Param('id') id:number){
    const agency=  this.agencyService.findOne(id)
    if(!agency){
      throw new HttpException('Agency with '+id +'Not Found !', 404)
    
  }
  return this.agencyService.findOne(id) 
}

@Post('add')
createAgency(@Body() agency:CreateAgency){
    console.log(agency.dateCreation);
   // agency.dateCreation =   new Date().toISOString();
   // agency.dateUpdate = new Date().toISOString();
    return this.agencyService.createAgency(agency);
    

    }
@Patch(':id')
updateAgency(@Param ('id') id:number, @Body() agency: UpdateAgency){
  const newAgency = this.agencyService.findOne(id)

  if(!newAgency){
    throw new HttpException('agency not found', 404)
  }

  return this.agencyService.update(id,agency)  
}

@Delete(':id')
deleteAgency(@Param('id') id : number){
    const agency = this.agencyService.findOne(id)
    if (!agency) {
        throw new HttpException('agency not found ', 404)
    
    }
   return this.agencyService.delete(id)
}

}
