import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Booking } from '../bookings/bookings.entity';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Payment, Booking]),
    BookingsModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
