import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AgenciesModule } from './Entities/agencies/agencies.module';
import { AgentModule } from './Entities/agent/agent.module';
import { BookingsModule } from './Entities/bookings/bookings.module';
import { BusesModule } from './Entities/buses/buses.module';
import { CustomersModule } from './Entities/customers/customers.module';
import { DriversModule } from './Entities/drivers/drivers.module';
import { FeedbacksModule } from './Entities/feedbacks/feedbacks.module';
import { MissionsModule } from './Entities/missions/missions.module';
import { NeedTransferModule } from './Entities/need-transfer/need-transfer.module';
import { NotificationsModule } from './Entities/notifications/notifications.module';
import { PaymentModule } from './Entities/payment/payment.module';
import { ReactionsModule } from './Entities/reactions/reactions.module';
import { SuperAgentModule } from './Entities/super-agent/super-agent.module';
import { TransfersModule } from './Entities/transfers/transfers.module';
import { UsersModule } from './Entities/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VilleModule } from './entities/ville/ville.module';
import { PusherModule } from './pusher/pusher.module';


@Module({
  imports: [UsersModule, AgenciesModule, TransfersModule, BusesModule, ReactionsModule, FeedbacksModule, 
    NotificationsModule, PaymentModule, BookingsModule, MissionsModule, DriversModule, 
    CustomersModule, AgentModule, SuperAgentModule, VilleModule, NeedTransferModule,PusherModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
