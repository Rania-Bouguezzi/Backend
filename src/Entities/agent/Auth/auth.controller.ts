import { BadRequestException, Body, Controller, Logger, Post } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { AuthAgentService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateAgent } from '../DTO/agentCreation.dto';

@Controller('auth/agent')
export class AuthAgentController {
    private readonly logger = new Logger(AuthAgentController.name);
    constructor( private readonly authService: AuthAgentService,  
        private jwtService: JwtService,
        private readonly configService: ConfigService
        ){}
      

    
    @Post('register')
   async Register(@Body() agent:CreateAgent){
      //  const password = user.password;
        const hashedPassword =  await bcrypt.hash(agent.password, 12);
        console.log(hashedPassword);
        agent.password=hashedPassword;
        return this.authService.createUser(agent)
    }
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const agent = await this.authService.find({ email });
        if (!agent) {
            throw new BadRequestException('agent does not exist');
        }
        if (!await bcrypt.compare(password, agent.password)) {
            throw new BadRequestException('invalid password');
        }

    //    const jwt = await this.jwtService.signAsync({id: user.id});
    const payload = {
        username : (await agent).username,
        email : (await agent).email,
        role : agent.role,
    } 
  //  console.log(process.env.JWT_SECRET)
    console.log(payload)
  //  const jwt = await this.jwtService.signAsync(payload);
  const jwt = await this.jwtService.signAsync(payload, {
    secret: this.configService.get<string>('JWT_SECRET'),
    expiresIn: '1d',
  })
 //   console.log('hello world !')
 //   console.log(jwt)
    return {
        "access_token" : jwt
    };

}






}
