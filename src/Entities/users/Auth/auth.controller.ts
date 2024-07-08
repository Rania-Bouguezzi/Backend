
import { BadRequestException, Body, Controller, Get, HttpException, Logger, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { AgentService } from 'src/Entities/agent/agent.service';
import { CreateUser } from '../DTO/usersCreate.dto';
import { AuthService } from './auth.service';
import { UpdateUser } from '../DTO/usersUpdate.dto';

@Controller('auth')
@ApiTags('Auth Users')
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
        const admin = await this.authService.getAdmin({email});
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

        if (user.role === 'Agent' || user.role === 'SuperAgent') {
            const agent = await this.authService.getById(user.id); 
            if (agent && agent.agency) {
                payload.agency = {
                    id: agent.agency.id,
                    name: agent.agency.name,
                    logo: agent.agency.logo,
                    email: agent.agency.emailAgency,
                    website: agent.agency.website ,
                    phone: agent.agency.phoneAgency,
                    address: agent.agency.addressAgency ,
                    type:agent.agency.type ,
                    status:agent.agency.status ,
                   
                };
            }
          
        }  else if(user.role === 'SuperAdmin')
            {
           const admin = await this.authService.getAdminById(user.id);
           if(admin){
            payload;
          
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
    logout(@Req() req, @Res() res): any {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).send({ error: 'An error occurred while destroying the session' });
                }
             
                return res.send({ msg: 'The user session has ended' });
            });
        } else {
            console.error('Session does not exist');
            return res.status(401).send({ error: 'Unauthorized' });
        }}

    @Get('/allUsers')
    getAllUsers(){
        return this.authService.getAllUsers();}
        @Get('/getAll')
    get(){
        return this.authService.getAllAll();}
        @Get('/findUsers')
        findAllUsers(){
            return this.authService.findAllUsers();}
    @Get(':id')
    getById(@Param('id') id:string){
        return this.authService.getById(id);
        

    }
    @Get('admin/:id')
    getAdminById(@Param('id') id:string){
        return this.authService.getAdminById(id);
        

    }
    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() user:UpdateUser)
    {   
        return this.authService.updateUser(id,user);
    }

}

