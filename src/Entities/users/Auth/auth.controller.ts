
import { BadRequestException, Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { CreateUser } from '../DTO/usersCreate.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AgentService } from 'src/Entities/agent/agent.service';

@Controller('auth')
@ApiTags('Auth Super Agent')
export class AuthController {
    private tokenToDestroy : String;
    private tokenData : any;
    private readonly logger = new Logger(AuthController.name);
    constructor( private readonly authService: AuthService,  
        private jwtService: JwtService,
        private readonly configService: ConfigService,
       private agentService : AgentService
        ){}
      

    
    @Post('register')
   async Register(@Body() user:CreateUser){
      //  const password = user.password;
        const hashedPassword =  await bcrypt.hash(user.password, 12);
        console.log(hashedPassword);
        user.password=hashedPassword;
        return this.authService.createUser(user)
    }


    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const users = await this.authService.getAllEntities({ email });
        if (!users || users.length === 0) {
            throw new BadRequestException('User does not exist');
        }

        const user = users[0]; // Premier utilisateur dans le tableau

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid password');
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstname : user.firstname,
            lastname : user.lastname,
            picture : user.picture,
            role: user.role,
            status : user.status,
            agency:null
        };

        if (user.role === 'Agent') {
            const agent = await this.agentService.findOne(user.id); 
            if (agent && agent.agency) {
                payload.agency = {
                    id: agent.agency.id,
                    name: agent.agency.name,
                    logo: agent.agency.logo,
                    email: agent.agency.email,
                    website: agent.agency.website ,
                    phone: agent.agency.phone,
                    address: agent.agency.address ,
                    type:agent.agency.type ,
                    status:agent.agency.status ,
                   
                };
            }
        }


      
        this.tokenData = payload;

        const jwt = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d',
        });
         this.tokenToDestroy =jwt;
     
        return {
            access_token: jwt, role: user.role, payload_ : payload
        };
    }
    @Get('tokenData')
    getToken(){
        return this.tokenData;
    }

    @Get('agencyAgent')
    getAgency(){
        if (this.getToken().role==='Agent')
         {}
    }

    @Get('/logout')
    logout(@Req() req): any {
      req.session.destroy();
      return { msg: 'The user session has ended' }
    }

    @Get('allUsers')
    getAllUsers(){
        return this.authService.getAllUsers();

    }


}

