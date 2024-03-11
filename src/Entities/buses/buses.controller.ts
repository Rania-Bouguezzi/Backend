import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBus } from './DTO/busesCreate.dto';
import { UpdateBus } from './DTO/busesUpdate.dto';

@Controller('buses')
export class BusesController {

constructor(private readonly busService : BusesService){}


@Get()
findAll(){
    return this.busService.findAll();
}
@Get(':id')
findById(@Param('id') id : number){
  const bus = this.busService.findOne(id);
  if (!bus){
    throw new HttpException('Bus with' + id + 'Not Found !', 404);
  }  
  return this.busService.findOne(id);
}
@Post('add')
createBus(@Body() bus: CreateBus){
    return this.busService.createBus(bus);
}
@Patch(':id')
updateBus(@Param ('id') id:number, @Body() bus: UpdateBus){
  const newBus = this.busService.findOne(id)

  if(!newBus){
    throw new HttpException('Bus not found', 404)
  }

  return this.busService.updateBus(id,bus)  
}

@Delete(':id')
deleteBus(@Param('id') id : number){
    const bus = this.busService.findOne(id)
    if (!bus) {
        throw new HttpException('Bus not found ', 404)
    
    }
   return this.busService.deleteBus(id)
}










}
