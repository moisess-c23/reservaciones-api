import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/booking.module';
import { ServicesProvidedModule } from './services-provided/service-provided.module';
import { StateReservationModule } from './states-reservations/state-reservation.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeManagementModule } from './employee-management/employee-management.module';
import { StoreClosureModule } from './store-closure/store-closure.module';
import { EmployeeScheduleModule } from './employee-schedule/employee-schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: false
      }),
      inject: [ConfigService],
    }),
    UserModule,
    BookingsModule,
    ServicesProvidedModule,
    StateReservationModule,
    AuthModule,
    EmployeeManagementModule,
    StoreClosureModule,
    EmployeeScheduleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }