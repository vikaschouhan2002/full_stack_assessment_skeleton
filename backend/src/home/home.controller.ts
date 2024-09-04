import { Controller, Get, Put, Query, Body, Param, Post, Delete } from '@nestjs/common';
import { HomeService } from './home.service';
import { Home } from './home.entity';
import { CreateHomeDto, UpdateHomeDto } from './home.dto';


@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) { }

  @Get('find-by-user')
  findHomesByUser(@Query('userId') userId: number, @Query('page') page: number = 1) {
    return this.homeService.findHomesByUser(userId, page);
  }

  @Put('update-users')
  updateUsersForHome(@Body() updateData: { homeId: number, userIds: number[] }) {
    return this.homeService.updateUsersForHome(updateData.homeId, updateData.userIds);
  }

  @Get('final')
  findAllUsers() {
    return this.homeService.findAll();
  }

  @Get('find/:id')
  findHomeById(@Param('id') id: number): Promise<Home> {
    return this.homeService.findById(id);
  }


  @Post('create')
  createHome(@Body() createHomeDto: CreateHomeDto): Promise<Home> {
    return this.homeService.createHomeWithUsers(createHomeDto);
  }

  @Put('update/:id')
  updateHome(
    @Param('id') id: number,
    @Body() updateHomeDto: UpdateHomeDto,
  ): Promise<Home> {
    return this.homeService.update(id, updateHomeDto);
  }

  @Delete('delete/:id')
  deleteHome(@Param('id') id: number): Promise<void> {
    return this.homeService.delete(id);
  }
}
