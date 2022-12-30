## Description

You can to use gadin-auth package easily and setup it.

## Usage

### Step 1: Installation

```sh
npm install gadin-auth
```

wait for the installation to finish.

### Step 2: Module initialization

You've to added below code in your root module:

```ts
@Module({
  imports: [
    AuthModule.forRoot({
      PUB_KEY: readFileSync(process.env.JWT_PUB),
      PRV_KEY: readFileSync(process.env.JWT_PRV),
      signOptions: {
        issuer: "SARDAR",
        algorithm: "ES256",
        expiresIn: "2m"
      }
    })
  ],
})
export class AppModule {
}
```

### Notices

1. You have to generate private_key and public_key by ssh.
2. select one item for Algorithm

### Step 3: Use in Services

You've to inject RedisClient in your service and use redis methods like below:

```ts
export class AppService {
  constructor(private readonly jwtService: JwtHandler) {
  }

  async createAccessToken() {
    return  await this.jwtService.sign<Payload>({ id, name, email, mobile });
  }
}

```

### Hint

``
Import JwtHandler from the gadin-auth
``



