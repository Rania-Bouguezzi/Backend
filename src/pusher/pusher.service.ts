import { Injectable } from "@nestjs/common";
import * as Pusher from "pusher";

@Injectable()
export class PusherService {
  pusher: Pusher;
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



}
