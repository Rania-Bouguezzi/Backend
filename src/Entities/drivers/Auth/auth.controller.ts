import { BadRequestException, Body, Controller, Logger, Post } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { AuthDriverService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateDriver } from '../DTO/driversCreation.dto';

@Controller('auth/driver')
export class AuthDriverController {
    private readonly logger = new Logger(AuthDriverController.name);
    constructor( private readonly authService: AuthDriverService,  
        private jwtService: JwtService,
        private readonly configService: ConfigService
        ){}
      

    
    @Post('register')
   async Register(@Body() driver:CreateDriver){
      //  const password = user.password;
        const hashedPassword =  await bcrypt.hash(driver.password, 12);
        console.log(hashedPassword);
        driver.password=hashedPassword;
        return this.authService.createUser(driver)
    }
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const driver = await this.authService.find({ email });
        if (!driver) {
            throw new BadRequestException('user does not exist');
        }
        if (!await bcrypt.compare(password, driver.password)) {
            throw new BadRequestException('invalid password');
        }

    //    const jwt = await this.jwtService.signAsync({id: user.id});
    const payload = {
        username : (await driver).username,
        email : (await driver).email,
        role : driver.role,
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
