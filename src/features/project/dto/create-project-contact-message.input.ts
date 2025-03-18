import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectContactMessageInput {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  description: string;
}
