import { BadRequestException, Body, Controller, Logger, Post } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { AuthCustomerService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateCustomer } from '../DTO/customersCreate.dto';

@Controller('auth/customer')
export class AuthCustomerController {
    private readonly logger = new Logger(AuthCustomerController.name);
    constructor( private readonly authService: AuthCustomerService,  
        private jwtService: JwtService,
        private readonly configService: ConfigService
        ){}
      

    
    @Post('register')
   async Register(@Body() customer:CreateCustomer){
      //  const password = user.password;
        const hashedPassword =  await bcrypt.hash(customer.password, 12);
        console.log(hashedPassword);
        customer.password=hashedPassword;
        return this.authService.createUser(customer)
    }
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const customer = await this.authService.find({ email });
        if (!customer) {
            throw new BadRequestException('user does not exist');
        }
        if (!await bcrypt.compare(password, customer.password)) {
            throw new BadRequestException('invalid password');
        }

    //    const jwt = await this.jwtService.signAsync({id: user.id});
    const payload = {
        username : (await customer).username,
        email : (await customer).email,
        role : customer.role,
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
