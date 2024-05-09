import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTranfer } from './DTO/tranfersCreate.dto';
import { UpdateTransfer } from './DTO/tranfersUpdate.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthController } from '../users/auth/auth.controller';

@Controller('transfers')
@ApiTags('Transfer')
export class TransfersController {
    constructor(private readonly transferService : TransfersService){}
    @Get()
    getAll(){
        return this.transferService.findAll()
    }
    @Get(':id')
findById(@Param('id') id : string){
    return this.transferService.findOne(id);
}

@Post('add')
createTransfer(@Body() transfer: CreateTranfer){
    return this.transferService.creatTransfert(transfer);
}

@Patch(':id')
updateTransfer(@Param('id') id:string, @Body() transfer:UpdateTransfer)
{   const newTransfer = this.transferService.findOne(id);
    if(!newTransfer){
        throw new HttpException('Transfer with' +id + 'Not Found !' , 404);
    }
    return this.transferService.updateTransfer(id,transfer);
}

@Delete(':id')
deleteTransfer(@Param('id') id : string){
    const transfer = this.transferService.findOne(id)
    if (!transfer) {
        throw new HttpException('Transfer not found ', 404)
    
    }
   return this.transferService.delteTransferr(id)
}

@Get('agency/:id')
getTransferByAgency(@Param('id') idAgency:string){
return this.transferService.getTransferByAgency(idAgency)
}

@Get('TransferNumber/agency/:id')
getNumberBus(@Param('id') idAgency:string){
return this.transferService.getTransferCountByAgency(idAgency)
}

@Get('shared/Transfer')
getSharedTransfer(){
return this.transferService.getSharedTransfer()
}

}