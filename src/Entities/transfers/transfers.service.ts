import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './transfers.entity';
import { Repository } from 'typeorm';
import { CreateTranfer } from './DTO/tranfersCreate.dto';
import { UpdateTransfer } from './DTO/tranfersUpdate.dto';

@Injectable()
export class TransfersService {


    constructor(@InjectRepository(Transfer) private transferRepository : Repository<Transfer>){}



    findAll(){
        return this.transferRepository.find();
    }
    
    findOne(id:number){
        return this.transferRepository.findOne({where: {id}});
    }
    
    
    createTransfer(transfer : CreateTranfer){
        transfer.dateCreation = new Date().toISOString();
        transfer.dateUpdate= new Date().toISOString();
       const  newTransfer = this.transferRepository.create(transfer);
       return this.transferRepository.save(newTransfer);
    }
    
    async updateTransfer(id:number ,transfer: UpdateTransfer): Promise<Transfer>{
        const update = await this.transferRepository.findOne({where: {id}});
        this.transferRepository.merge(update,transfer);
        return await this.transferRepository.save(update);
        }
        
        
        
        delteTransferr(id:number){
            return this.transferRepository.delete(id);
        }
        



















}
