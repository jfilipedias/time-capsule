# NLW Spacetime

## Getting started

Uma vez que o projeto utiliza o GitHub como provedor de autenticação por meio do protocolo OAuth, será necessário configurar um aplicativo OAuth nas configurações da sua conta do GitHub. Dessa forma, você deverá seguir os seguintes passos:

1. Configurar o `GitHub Client Id` nas variáveis de ambiente do projeto `web` como exemplificado no [arquivo .env.example](./web/.env.example) do projeto `web`:

```
NEXT_PUBLIC_GITHUB_CLIENT_ID="your-github-oauth-app-client-id"
```

2. Configurar o `GitHub Client Id` e o `GitHub Client Secret` nas variáveis de ambiente do projeto `server` como exemplificado no [arquivo .env.example](./server/.env.example) do projeto `server`:

```
GITHUB_CLIENT_ID="your-github-oauth-app-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-app-client-secret"
```

Além disso, por utilizar JWT, é necessário configurar um `secret`, gerado de forma aleatória, como exemplificado no [arquivo .env.example](./server/.env.example) do projeto `server`:

```
JWT_SECRET="your-jwt-radom-secret"
```

Para gerar o `secret`, é possível utilizar a seguinte função do `openssl`: 
```openssl rand -base64 32```
