import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notifications.entity';
import { Repository } from 'typeorm';
import { CreateNotification } from './DTO/notificationsCreate.dto';
import { UpdateNotification } from './DTO/notificationsUpdate.dto';

@Injectable()
export class NotificationsService {
    findById(id: string) {
        throw new Error('Method not implemented.');
    }



    constructor(@InjectRepository(Notification) private notificationRepository : Repository<Notification>){}



    findAll(){
        return this.notificationRepository.find();
    }
    
    findOne(id:string){
        return this.notificationRepository.findOne({where: {id}});
    }
    
    
    createNotif(notif : CreateNotification){
        notif.dateCreation = new Date().toISOString();
        notif.dateUpdate= new Date().toISOString();
       const  newNotif = this.notificationRepository.create(notif);
       return this.notificationRepository.save(newNotif);
    }
    
    async updateNotif(id:string ,notif: UpdateNotification): Promise<Notification>{
        const update = await this.notificationRepository.findOne({where: {id}});
        this.notificationRepository.merge(update,notif);
        return await this.notificationRepository.save(update);
        }
        
        
        
        delteNotif(id:string){
            return this.notificationRepository.delete(id);
        }
        















}
