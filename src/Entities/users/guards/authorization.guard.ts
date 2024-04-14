import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
 
 constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
  // const request = context.switchToHttp().getRequest();
 // requiredRole = le role qui est annoté dans le décorateur dans les controleurs
 /*  const requiredRoles= this.reflector.getAllAndOverride(ROLES_KEY, [
    context.getClass(),
    context.getHandler()] );*/
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
  console.log('The required roles are:' + roles);
/*   const userRole = request.user.role;
   console.log(userRole);
   if (requiredRoles !== userRole) return false;
//  console.log(userRole);
   console.log(' Inside Authorization Guard !')
    return true;*/
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user  // THIS is what is missing
    console.log(user.role);
    return roles.some((role) => {
      return role === user.role;
    });
  }
  }

