import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AUTH_INTERATOR, AuthUseCase } from 'src/usecase/auth/usecase';
import { apiVersion } from 'src/utils/verison';
import { LoginDto } from './dto/auth.dto';
import { ResponseLogin } from 'src/usecase/auth/interator';

@Controller(`api/${apiVersion}/auth`)
export class AuthController {
  constructor(
    @Inject(AUTH_INTERATOR)
    private readonly authUseCase: AuthUseCase,
  ) {}

  @Post('login')
  async login(@Body() req: LoginDto): Promise<ResponseLogin> {
    return await this.authUseCase.login(req)
  }
}
