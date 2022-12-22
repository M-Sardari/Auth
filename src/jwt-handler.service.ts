import { sign, verify } from "jsonwebtoken";
import { AuthConfig } from "./auth.config";
import { Inject } from "@nestjs/common";

export class JwtHandler {
  constructor(@Inject("IDENTITY_CONFIG") private options: AuthConfig) {
  }

  async verify<T>(token: string): Promise<T> | undefined {
    try {
      return (await verify(token, this.options.PUB_KEY, {
        algorithms: [this.options.signOptions.algorithm]
      })) as T;
    } catch (e) {
      return undefined;
    }
  }

  async sign<T>(payload: T) {
    return sign(payload as object, this.options.PRV_KEY, {
      issuer: this.options.signOptions.issuer,
      expiresIn: this.options.signOptions.expiresIn,
      algorithm: this.options.signOptions.algorithm
    });
  }
}
