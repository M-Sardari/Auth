import { DynamicModule, Module } from "@nestjs/common";
import { AuthConfig } from "./auth.config";
import { JwtHandler } from "./jwt-handler.service";
import { AuthGuard } from "./auth.guard";

@Module({})
export class AuthModule {
  static forRoot(options: AuthConfig): DynamicModule {
    return {
      global: true,
      module: AuthModule,
      imports: [],
      providers: [
        JwtHandler,
        AuthGuard,
        {
          provide: "IDENTITY_CONFIG",
          useValue: options
        }
      ],
      exports: [
        "IDENTITY_CONFIG",
        AuthGuard,
        JwtHandler
      ]
    };
  }
}
