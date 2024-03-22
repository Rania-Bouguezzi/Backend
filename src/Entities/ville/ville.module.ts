import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ville } from './ville.entity';
import { VilleController } from './ville.controller';
import { VilleService } from './ville.service';

@Module({
    imports:[
      TypeOrmModule.forFeature([Ville]),
  
    ],
    controllers: [VilleController],
    providers: [VilleService]
  })
export class VilleModule {}
