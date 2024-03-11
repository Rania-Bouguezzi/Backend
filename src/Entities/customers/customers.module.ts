import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Agency } from '../agencies/agencies.entity';
import { AgenciesModule } from '../agencies/agencies.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Customer, Agency]),
    AgenciesModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
