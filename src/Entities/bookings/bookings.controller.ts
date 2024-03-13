import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBooking } from './DTO/bookingsCreate.dto';
import { UpdateBooking } from './DTO/bookingsUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('bookings')
@ApiTags('Booking')
export class BookingsController {

constructor(private readonly bookingService: BookingsService){}

@Get()
findAll(){
    return this.bookingService.findAll();
}
@Get(':id')
findById(@Param('id') id : string){
  const booking = this.bookingService.findOne(id);
  if (!booking){
    throw new HttpException('Booking with' + id + 'Not Found !', 404);
  }  
  return this.bookingService.findOne(id);
}
@Post('add')
createBooking(@Body() booking: CreateBooking){
    return this.bookingService.createBooking(booking);
}
@Patch(':id')
updateBooking(@Param ('id') id:string, @Body() bookking: UpdateBooking){
  const newBooking = this.bookingService.findOne(id)

  if(!newBooking){
    throw new HttpException('Booking not found', 404)
  }

  return this.bookingService.updateBooking(id,bookking)  
}

@Delete(':id')
deleteBooking(@Param('id') id : string){
    const booking = this.bookingService.findOne(id)
    if (!booking) {
        throw new HttpException('Booking not found ', 404)
    
    }
   return this.bookingService.deleteBooking(id)
}








}
