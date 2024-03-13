import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePayment } from './DTO/paymentCreate.dto';
import { UpdatePayment } from './DTO/paymentUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
    constructor(private readonly  paymentService : PaymentService){}
    @Get(':id')
findById(@Param('id') id : string){
    return this.paymentService.findOne(id);
}

@Post('add')
createPay(@Body() pay: CreatePayment){
    return this.paymentService.createPayment(pay);
}

@Patch('id')
updatePay(@Param('id') id:string, @Body() pay:UpdatePayment)
{   const newPay = this.paymentService.findOne(id);
    if(!newPay){
        throw new HttpException('Payment with' +id + 'Not Found !' , 404);
    }
    return this.paymentService.updatePayment(id,pay);
}

@Delete(':id')
deletePay(@Param('id') id : string){
    const pay = this.paymentService.findOne(id)
    if (!pay) {
        throw new HttpException('Payment not found ', 404)
    
    }
   return this.paymentService.deltePayment(id)
}



}
