import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Entities/users/users.module';
import { AgenciesModule } from './Entities/agencies/agencies.module';
import { TransfersModule } from './Entities/transfers/transfers.module';
import { BusesModule } from './Entities/buses/buses.module';
import { ReactionsModule } from './Entities/reactions/reactions.module';
import { FeedbacksModule } from './Entities/feedbacks/feedbacks.module';
import { NotificationsModule } from './Entities/notifications/notifications.module';
import { PaymentModule } from './Entities/payment/payment.module';
import { BookingsModule } from './Entities/bookings/bookings.module';
import { MissionsModule } from './Entities/missions/missions.module';
import { DriversModule } from './Entities/drivers/drivers.module';
import { CustomersModule } from './Entities/customers/customers.module';
import { AgentModule } from './Entities/agent/agent.module';
import { SuperAgentModule } from './Entities/super-agent/super-agent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VilleModule } from './entities/ville/ville.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { NeedTransferModule } from './Entities/need-transfer/need-transfer.module';
import { PusherService } from './pusher/pusher.service';
import { PusherController } from './pusher/pusher.controller';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [UsersModule, AgenciesModule, TransfersModule, BusesModule, ReactionsModule, FeedbacksModule, 
    NotificationsModule, PaymentModule, BookingsModule, MissionsModule, DriversModule, 
    CustomersModule, AgentModule, SuperAgentModule, VilleModule, NeedTransferModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // IPNetwork : 172.20.0.02
      port: 54320,
      username: 'user',
      password: 'admin',
      database: 'ProjectDataBase',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    JwtModule.register({
      global : true,
       secret: process.env.JWT_SECRET, 
       signOptions: { expiresIn: '1d' },
     }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  
    VilleModule, 
    MulterModule.register({
      dest: './uploads', // Le dossier où les images seront stockés
    }),
  
  
  
  ],
  controllers: [AppController, PusherController],
  providers: [AppService, PusherService],
})
export class AppModule {}
