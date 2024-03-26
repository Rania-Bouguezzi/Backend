import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { Agency } from '../agencies/agencies.entity';
import { Mission } from '../missions/missions.entity';
import { AgenciesModule } from '../agencies/agencies.module';
import { MissionsModule } from '../missions/missions.module';
import { AuthDriverController } from './Auth/auth.controller';
import { AuthDriverService } from './Auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Driver, Agency, Mission]),
    AgenciesModule, MissionsModule
  ],
  controllers: [DriversController, AuthDriverController],
  providers: [DriversService, AuthDriverService, JwtService, ConfigService]
})
export class DriversModule {}
