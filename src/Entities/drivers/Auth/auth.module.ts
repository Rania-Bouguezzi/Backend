import { Module } from '@nestjs/common';
import { AuthDriverService } from './auth.service';
import { AuthDriverController } from './auth.controller';

@Module({
  imports:[
    
  ],
  providers: [AuthDriverService],
  controllers: [AuthDriverController]
})
export class AuthModule {



}
