import { Module } from '@nestjs/common';
import { AuthAgentService } from './auth.service';
import { AuthAgentController,  } from './auth.controller';

@Module({
  imports:[
    
  ],
  providers: [AuthAgentService],
  controllers: [AuthAgentController]
})
export class AuthModule {



}
