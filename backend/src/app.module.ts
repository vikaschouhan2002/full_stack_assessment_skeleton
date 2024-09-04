import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { Home } from './home/home.entity';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Home],
      synchronize: true, // Note: Set this to false in production
    }),
    UserModule,
    HomeModule,
  ],
})
export class AppModule { }
