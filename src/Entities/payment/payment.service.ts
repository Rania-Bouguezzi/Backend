import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository, UpdateOptions } from 'typeorm';
import { CreateNotification } from '../notifications/DTO/notificationsCreate.dto';
import { CreatePayment } from './DTO/paymentCreate.dto';
import { UpdatePayment } from './DTO/paymentUpdate.dto';

@Injectable()
export class PaymentService {




    constructor(@InjectRepository(Payment) private paymentRepository : Repository<Payment>){}



    findAll(){
        return this.paymentRepository.find();
    }
    
    findOne(id:number){
        return this.paymentRepository.findOne({where: {id}});
    }
    
    
    createPayment(pay : CreatePayment){
      
       const  newPay = this.paymentRepository.create(pay);
       return this.paymentRepository.save(newPay);
    }
    
    async updatePayment(id:number ,pay: UpdatePayment): Promise<Payment>{
        const update = await this.paymentRepository.findOne({where: {id}});
        this.paymentRepository.merge(update,pay);
        return await this.paymentRepository.save(update);
        }
        
        
        
        deltePayment(id:number){
            return this.paymentRepository.delete(id);
        }
        


















}
