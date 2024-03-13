import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomer } from './DTO/customersCreate.dto';
import { UpdateCustomer } from './DTO/customersUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('customers')
@ApiTags('Customer')
export class CustomersController {

    constructor(private readonly customerService : CustomersService){}


    @Get()
    findAll(){
        return this.customerService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id : string){
      const customer = this.customerService.findOne(id);
      if (!customer){
        throw new HttpException('Customer with' + id + 'Not Found !', 404);
      }  
      return this.customerService.findOne(id);
    }
    @Post('add')
    createCustomer(@Body() customer: CreateCustomer){
        return this.customerService.createCustomer(customer);
    }
    @Patch(':id')
    updateCustomer(@Param ('id') id:string, @Body() customer: UpdateCustomer){
      const newCustomer = this.customerService.findOne(id)
    
      if(!newCustomer){
        throw new HttpException('Customer not found', 404)
      }
    
      return this.customerService.updateCustomer(id,customer)  
    }
    
    @Delete(':id')
    deleteCustomer(@Param('id') id : string){
        const customer = this.customerService.findOne(id)
        if (!customer) {
            throw new HttpException('Customer not found ', 404)
        
        }
       return this.customerService.deleteCustomer(id)
    }
    
    
    











}
