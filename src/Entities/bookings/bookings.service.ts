import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { Repository } from 'typeorm';
import { CreateBooking } from './DTO/bookingsCreate.dto';
import { UpdateBooking } from './DTO/bookingsUpdate.dto';

@Injectable()
export class BookingsService {

constructor(@InjectRepository(Booking) private bookingRepository: Repository<Booking> ){}

findAll(){
    return this.bookingRepository.find();
}

findOne(id:number){
    return this.bookingRepository.findOne({where: {id}});
}


createBooking(booking : CreateBooking){
    booking.dateCreation = new Date().toISOString();
    booking.dateUpdate= new Date().toISOString();
   const  newBooking = this.bookingRepository.create(booking);
   return this.bookingRepository.save(newBooking);
}

async updateBooking(id:number ,booking: UpdateBooking): Promise<Booking>{
    const update = await this.bookingRepository.findOne({where: {id}});
    this.bookingRepository.merge(update,booking);
    return await this.bookingRepository.save(update);
    }
    
    
    
    deleteBooking(id:number){
        return this.bookingRepository.delete(id);
    }
    

}
