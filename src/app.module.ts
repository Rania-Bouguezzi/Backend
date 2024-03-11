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


@Module({
  imports: [UsersModule, AgenciesModule, TransfersModule, BusesModule, ReactionsModule, FeedbacksModule, 
    NotificationsModule, PaymentModule, BookingsModule, MissionsModule, DriversModule, 
    CustomersModule, AgentModule, SuperAgentModule,
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
  
  
  
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
