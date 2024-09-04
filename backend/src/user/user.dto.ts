import { IsNotEmpty, IsString, IsEmail,IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  }