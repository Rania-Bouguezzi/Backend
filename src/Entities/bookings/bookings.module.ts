import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { Agency } from '../agencies/agencies.entity';
import { Transfer } from '../transfers/transfers.entity';




@Module({
  imports:[
    TypeOrmModule.forFeature([Booking, Agency, Transfer]),

  ],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
