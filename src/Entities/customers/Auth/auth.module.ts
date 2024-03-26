import { Module } from '@nestjs/common';
import { AuthCustomerService } from './auth.service';
import { AuthCustomerController } from './auth.controller';

@Module({
  imports:[
    
  ],
  providers: [AuthCustomerService],
  controllers: [AuthCustomerController]
})
export class AuthModule {



}
