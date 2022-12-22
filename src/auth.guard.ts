import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtHandler } from "./jwt-handler.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtHandler) {
  }

  async canActivate(context: ExecutionContext) {
    let isValid = false;

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization || Array.isArray(authorization)) {
      isValid = false;
    } else {
      const token = authorization.replace("Bearer", "").trim();
      const user = await this.jwtService.verify(token);
      if (user === undefined) {
        isValid = false;
      } else {
        request.user = user;
        isValid = true;
      }
    }
    if (!isValid) throw new UnauthorizedException();

    return isValid;
  }
}
