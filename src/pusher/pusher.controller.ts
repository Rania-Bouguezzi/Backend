import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
    constructor(private pusherService : PusherService) {}

    @Post("messages")
    async messages(
      @Body("username") username: string,
      @Body("logo") logo: string,
      @Body("agencyName") agencyName: string,
      @Body("userRecepteur") userRecepteur: string,
      @Body("userEmetteur") userEmetteur: string,
      @Body("message") message: string
    ) {
      const newMessage = this.pusherService.addMessage(username, logo, agencyName,userRecepteur,userEmetteur, message);
      await this.pusherService.trigger("chat", "message", newMessage);
      return newMessage;
    }
  
    @Get("messages")
    getMessages() {
      return this.pusherService.getMessages();
    }
    @Get('messages/:userEmetteur/:userRecepteur')
    getMessageById(  @Param('userEmetteur') userEmetteur: string,
    @Param('userRecepteur') userRecepteur: string){
      return this.pusherService.getMessageById(userEmetteur,userRecepteur);
    }
}
