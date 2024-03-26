import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Agency } from '../agencies/agencies.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { AuthCustomerController } from './Auth/auth.controller';
import { AuthCustomerService } from './Auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Customer, Agency]),
    AgenciesModule
  ],
  controllers: [CustomersController , AuthCustomerController],
  providers: [CustomersService, AuthCustomerService, JwtService, ConfigService]
})
export class CustomersModule {}
