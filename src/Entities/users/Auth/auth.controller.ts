import { BadRequestException, Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateUser } from '../DTO/usersCreate.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor( private readonly authService: AuthService,  
        private jwtService: JwtService,
        private readonly configService: ConfigService
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
        const user = await this.authService.find({ email });
        if (!user) {
            throw new BadRequestException('invalid credentials');
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid password');
        }

    //    const jwt = await this.jwtService.signAsync({id: user.id});
    const payload = {
        username : (await user).username,
        email : (await user).email,
        role : user.role,
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
