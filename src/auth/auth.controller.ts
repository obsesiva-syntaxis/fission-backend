import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO, LoginUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  signup( @Body() registerUserDTO: RegisterUserDTO){
    return this.authService.signup(registerUserDTO);
  }

  @Post('login')
  login( @Body() loginUserDTO: LoginUserDTO ){
    return this.authService.login(loginUserDTO);
  }
}
