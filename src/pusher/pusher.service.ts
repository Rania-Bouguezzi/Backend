import { Injectable } from "@nestjs/common";
import * as Pusher from "pusher";

@Injectable()
export class PusherService {
  pusher: Pusher;
  private messages: { username: string; logo:string, agencyName:string, userRecepteur:string, userEmetteur:string, message: string }[] = [];
constructor(){
  
 this.pusher = new Pusher({
        appId: "1795279",
        key: "40c72b14f719befa9bcf",
        secret: "13ce794a15a7e4177fb7",
        cluster: "eu",
        useTLS: true
      });
}
async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }

  addMessage(username: string, logo:string, agencyName:string ,userRecepteur:string,userEmetteur:string,message: string) {
    const newMessage = { username, logo, agencyName,userRecepteur,userEmetteur,message };
    this.messages.push(newMessage);
    return newMessage;
  }

  getMessages() {
    return this.messages;
  }

  getMessageById(idEmetteur:string, idRecepteur: string ) {
    return this.messages.filter(message => 
   (message.userEmetteur===idEmetteur) &&  (message.userRecepteur === idRecepteur ) || 
 (message.userRecepteur === idEmetteur ) &&  (message.userEmetteur === idRecepteur )
     
    );
  }

}
