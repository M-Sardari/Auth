import { Algorithm } from "jsonwebtoken";

export class AuthConfig {
    // JWT_SECRET?: string;
    PUB_KEY?: Buffer;
    PRV_KEY?: Buffer;
    signOptions:{
        algorithm?: Algorithm;
        issuer : string;
        expiresIn:string
    }
}
