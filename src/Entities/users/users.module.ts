import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),

  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, JwtService, ConfigService]
})
export class UsersModule {}
