import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { Home } from './home.entity';
import { User } from 'src/user/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Home, User])],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
