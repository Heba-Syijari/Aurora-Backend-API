import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectContactMessageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  description: string;
}
