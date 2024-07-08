import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotification } from './DTO/notificationsCreate.dto';
import { UpdateNotification } from './DTO/notificationsUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationsController {
    constructor(private readonly notifService : NotificationsService){}
@Get()
findAll(){
    return this.notifService.findAll();
}

    @Get(':id')
findById(@Param('id') id : string){
    return this.notifService.findOne(id);
}

@Post('add')
createNotif(@Body() notif: CreateNotification){
    return this.notifService.creatNotif(notif);
}

@Patch(':id')
updateNotif(@Param('id') id:string, @Body() notif:UpdateNotification)
{   const newNotif = this.notifService.findOne(id);
    if(!newNotif){
        throw new HttpException('Notification with' +id + 'Not Found !' , 404);
    }
    return this.notifService.updateNotif(id,notif);
}

@Delete(':id')
deleteNotif(@Param('id') id : string){
    const notif = this.notifService.findOne(id)
    if (!notif) {
        throw new HttpException('Notification not found ', 404)
    
    }
   return this.notifService.delteNotif(id)
}

@Get('agency/:id')
getNotifByAgency(@Param('id') idAgency:string){
return this.notifService.getNotificationByAgency(idAgency)
}

@Get(':id/transfer/:idTra')
getNotifByTransfer(@Param('id') idAgency:string, @Param('idTra') idTransfer:string){
return this.notifService.getNotifOfTransfer(idAgency, idTransfer);
}

@Get('booking/:id')
getBookingByAgency(@Param('id') id:string){
    return this.notifService.getBookingAccepted(id);
}

}
