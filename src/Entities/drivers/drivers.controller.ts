import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriver } from './DTO/driversCreation.dto';
import { UpdateDriver } from './DTO/driversUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('drivers')
@ApiTags('Driver')
export class DriversController {

    constructor(private readonly driverService : DriversService){}


    @Get()
    findAll(){
        return this.driverService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id : string){
      const driver = this.driverService.findOne(id);
      if (!driver){
        throw new HttpException('Driver with' + id + 'Not Found !', 404);
      }  
      return this.driverService.findOne(id);
    }
    @Post('add')
    create(@Body() driver: CreateDriver){
        return this.driverService.createDriver(driver);
    }
    @Patch(':id')
    update(@Param ('id') id:string, @Body() driver: UpdateDriver){
      const newDriver = this.driverService.findOne(id)
    
      if(!newDriver){
        throw new HttpException('Driver not found', 404)
      }
    
      return this.driverService.updateDriver(id,driver)  
    }
    
    @Delete(':id')
    delete(@Param('id') id : string){
        const driver = this.driverService.findOne(id)
        if (!driver) {
            throw new HttpException('Driver not found ', 404)
        
        }
       return this.driverService.delteDriver(id)
    }

    @Get('agency/:id')
getDriversByAgency(@Param('id') idAgency:string){
return this.driverService.getDriverByAgency(idAgency)
}


@Get('driversNumber/agency/:id')
getDriversNumber(@Param('id') idAgency:string){
return this.driverService.getDriversCountByAgency(idAgency)
}








}
