import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('find-all')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get('find-by-home')
  findUsersByHome(@Query('homeId') homeId: number) {
    return this.userService.findByHome(homeId);
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put('update/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
