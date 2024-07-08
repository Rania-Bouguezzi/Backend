import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notifications.entity';
import { Repository } from 'typeorm';
import { CreateNotification } from './DTO/notificationsCreate.dto';
import { UpdateNotification } from './DTO/notificationsUpdate.dto';
import { Agent } from '../agent/agent.entity';
import { typeStatus } from 'src/Type/Type';

@Injectable()
export class NotificationsService {
    findById(id: string) {
        throw new Error('Method not implemented.');
    }



    constructor(@InjectRepository(Notification) private notificationRepository : Repository<Notification>,
    @InjectRepository(Agent) private agentRepository : Repository<Agent>){}



    findAll(){
        return this.notificationRepository.find({ relations:['agent' , 'agent.agency']});
    }
    
    findOne(id:string){
        return this.notificationRepository.findOne({where: {id},relations:['agent', 'agent.agency']},);
    }
    
    nbNotif(){

    }
    
    async creatNotif(notif: CreateNotification): Promise<Notification> {
        
        const {message,  agentId, agencyEmettriceId,agencyEmettriceLogo, agencyEmettriceName ,agentEmetteurId, from , to , nbPlaces, date_time,  notifAccept,notifRefus, transferId} = notif;
        const agent = await this.agentRepository.findOne({ where: { id: agentId } });
        if (!agent) {
          throw new Error('Agent introuvable');
        }
        const newNotif = this.notificationRepository.create({message, agent,agencyEmettriceId,agencyEmettriceLogo, agencyEmettriceName,agentEmetteurId, from , to , nbPlaces, date_time, notifAccept, notifRefus,transferId});
        newNotif.dateCreation = new Date().toISOString();
        newNotif.dateUpdate = new Date().toISOString();
        newNotif.status = typeStatus.ACTIVE;
        newNotif.sendingTime =  new Date().toDateString();
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
        



        async getNotificationByAgency(idAgency:string):Promise <Notification[]>{
            return  this.notificationRepository.find(
                  {
                    where: {
                        agent: {
                          agency: { id: idAgency }
                        }
                      },relations:['agent', 'agent.agency']
                  }
              )
          }


async getNotifOfTransfer(idAgency:string,idTransfer:string):Promise<Notification[]>{
    return  this.notificationRepository.find(
        {
          where: {
              agent: {
                agency: { id: idAgency }
              },
              transferId: idTransfer
            },
            
        }
    );
}

  async getBookingAccepted(idAgency: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: {
        agent: {
          agency: { id: idAgency }
        },
        notifAccept: true
      }
    });
  }







}
