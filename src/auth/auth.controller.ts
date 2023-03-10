import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';
import { Response } from '../common/interfaces/response.inteface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signup: signupDto): Promise<Response> {
    return this.authService.singUp(signup);
  }

  @Post('signin')
  signIn(@Body() signin: signinDto) {
    return this.authService.signIn(signin);
  }
}
