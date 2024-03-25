import {
  Injectable,
} from '@nestjs/common';
import { AuthUseCase } from './usecase';
import { LoginDto } from 'src/interface/controller/api/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

export type JwtPayload = {
  userId: string;
  username: string;
};

export type ResponseLogin = {
  accessToken: string;
  accessTokenExp: number;
};

@Injectable()
export class AuthInterator implements AuthUseCase {
  constructor(private jwtService: JwtService) {}

  async login(params: LoginDto): Promise<ResponseLogin> {
    return {
      accessToken: '',
      accessTokenExp: 123,
    };
  }

  private async generateJwtToken(payload: JwtPayload, expiresIn: string) {
    const token = await this.jwtService.signAsync(payload, { expiresIn });
    return token;
  }
}
