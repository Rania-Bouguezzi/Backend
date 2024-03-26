import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthentificationGuard implements CanActivate {
  constructor(private jwtService : JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(' Inside Authentification Guard !');
  
    try{
      const request = context.switchToHttp().getRequest();
      // console.log(request.headers);
       const token = request.headers.authorization.split(' ')[1];
       //console.log(token);
       
       if (! token){   //token n'existe pas
          throw new UnauthorizedException(' token null');
        
       }
       request.user = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
  //  console.log(token.payload);
 //   console.log(request.user);
    
    } catch (error){
      console.log(error);
      throw new UnauthorizedException('Token ivalid'); //this error
   
    }
    
    return true;
  }
}
