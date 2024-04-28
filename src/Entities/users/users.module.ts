import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomersController } from '../customers/customers.controller';
import { AgentController } from '../agent/agent.controller';
import { DriversController } from '../drivers/drivers.controller';
import { CustomersService } from '../customers/customers.service';
import { AgentService } from '../agent/agent.service';
import { DriversService } from '../drivers/drivers.service';
import { Customer } from '../customers/customer.entity';
import { Driver } from '../drivers/driver.entity';
import { Agent } from '../agent/agent.entity';
import { AgenciesController } from '../agencies/agencies.controller';
import { AgenciesService } from '../agencies/agencies.service';
import { Agency } from '../agencies/agencies.entity';
import { SuperAgentController } from '../super-agent/super-agent.controller';
import { SuperAgentService } from '../super-agent/super-agent.service';
import { SuperAgent } from '../super-agent/superAgent.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Driver]),
    TypeOrmModule.forFeature([Agent]),
    TypeOrmModule.forFeature([SuperAgent]),
    TypeOrmModule.forFeature([Agency]),

  ],
  controllers: [UsersController, CustomersController, AgentController, SuperAgentController,AgenciesController,DriversController,AuthController],
  providers: [UsersService, AuthService,CustomersService, AgentService, SuperAgentService, AgenciesService,DriversService ,JwtService, ConfigService]
})
export class UsersModule {}
