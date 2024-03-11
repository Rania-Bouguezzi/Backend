import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotification } from './DTO/notificationsCreate.dto';
import { UpdateNotification } from './DTO/notificationsUpdate.dto';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notifService : NotificationsService){}
    @Get(':id')
findById(@Param('id') id : number){
    return this.notifService.findOne(id);
}

@Post('add')
createNotif(@Body() notif: CreateNotification){
    return this.notifService.createNotif(notif);
}

@Patch('id')
updateNotif(@Param('id') id:number, @Body() notif:UpdateNotification)
{   const newNotif = this.notifService.findOne(id);
    if(!newNotif){
        throw new HttpException('Notification with' +id + 'Not Found !' , 404);
    }
    return this.notifService.updateNotif(id,notif);
}

@Delete(':id')
deleteNotif(@Param('id') id : number){
    const notif = this.notifService.findOne(id)
    if (!notif) {
        throw new HttpException('Notification not found ', 404)
    
    }
   return this.notifService.delteNotif(id)
}



}
