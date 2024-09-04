import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, } from 'class-validator';

export class CreateHomeDto {
  @IsNotEmpty()
  @IsString()
  street_address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds?: number[];
}



export class UpdateHomeDto {
  @IsOptional()
  @IsString()
  street_address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;
}
