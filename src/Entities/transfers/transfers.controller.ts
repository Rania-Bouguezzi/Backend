import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTranfer } from './DTO/tranfersCreate.dto';
import { UpdateTransfer } from './DTO/tranfersUpdate.dto';

@Controller('transfers')
export class TransfersController {
    constructor(private readonly transferService : TransfersService){}
    @Get(':id')
findById(@Param('id') id : number){
    return this.transferService.findOne(id);
}

@Post('add')
createTransfer(@Body() transfer: CreateTranfer){
    return this.transferService.createTransfer(transfer);
}

@Patch('id')
updateTransfer(@Param('id') id:number, @Body() transfer:UpdateTransfer)
{   const newTransfer = this.transferService.findOne(id);
    if(!newTransfer){
        throw new HttpException('Transfer with' +id + 'Not Found !' , 404);
    }
    return this.transferService.updateTransfer(id,transfer);
}

@Delete(':id')
deleteTransfer(@Param('id') id : number){
    const transfer = this.transferService.findOne(id)
    if (!transfer) {
        throw new HttpException('Transfer not found ', 404)
    
    }
   return this.transferService.delteTransferr(id)
}



}
