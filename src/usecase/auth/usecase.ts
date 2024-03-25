import { LoginDto } from "src/interface/controller/api/dto/auth.dto"
import { ResponseLogin } from "./interator"

export interface AuthUseCase {
  login(params: LoginDto): Promise<ResponseLogin>
}

export const AUTH_INTERATOR = 'AUTH_INTERATOR'