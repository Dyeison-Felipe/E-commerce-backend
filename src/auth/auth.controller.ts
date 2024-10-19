import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLoginDto } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    return this.authService.signIn(loginDto);
  }
}
