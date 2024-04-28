import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { NeedTransferService } from './need-transfer.service';
import { NeedTransferCreate } from './DTO/needTransferCreate.dto';
import { NeedTransferUpdate } from './DTO/needTransferUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('need-transfer') 
@ApiTags('Need Transfer')
export class NeedTransferController {


constructor(private readonly needService : NeedTransferService ){}


    @Get()
    findAll(){
        return this.needService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id : string){
      const need = this.needService.findOne(id);
      if (!need){
        throw new HttpException('Transfer with' + id + 'Not Found !', 404);
      }  
      return this.needService.findOne(id);
    }
    @Post('add')
    createBus(@Body() need: NeedTransferCreate){
        return this.needService.creatTransfer(need);
    }
    @Patch(':id')
    update(@Param ('id') id:string, @Body() need: NeedTransferUpdate){
      const newNeed = this.needService.findOne(id)
    
      if(!newNeed){
        throw new HttpException('Transfer not found', 404)
      }
    
      return this.needService.updateTransfer(id,need)  
    }
    
    @Delete(':id')
    delete(@Param('id') id : string){
        const need = this.needService.findOne(id)
        if (!need) {
            throw new HttpException('NeedTransfer not found ', 404)
        
        }
       return this.needService.deleteTransfer(id)
    }
    
    @Get('agency/:id')
    getBusByAgency(@Param('id') idAgency:string){
    return this.needService.getNeedTransferByAgency(idAgency)
    }
    













}
