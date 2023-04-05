import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 6 })
  password: string;
}

export class SignInUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(
      registerUserDto.email,
      registerUserDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto.email, signInUserDto.password);
  }
}
