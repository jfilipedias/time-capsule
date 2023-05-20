# NLW Spacetime

## Getting started

### Configurando o OAuth

Uma vez que o projeto utiliza o GitHub como provedor de autenticação por meio do protocolo OAuth, será necessário configurar um aplicativo OAuth nas configurações da sua conta do GitHub. É importante notar que serão necessários configurar dois `OAuth Apps` no GitHub, sendo um para o front-end e back-end e outra para o mobile

Dessa forma, você deverá seguir os seguintes passos:

1. Configurar o `GitHub Client Id` em um arquivo `.env.local` do projeto `web` como exemplificado no [arquivo .env.example](./web/.env.example) do projeto `web`:

```
NEXT_PUBLIC_GITHUB_CLIENT_ID="your-github-oauth-app-client-id"
```

2. Configurar o `GitHub Client Id` e o `GitHub Client Secret` em um arquivo `.env` do projeto `server` como exemplificado no [arquivo .env.example](./server/.env.example) do projeto `server`:

```
GITHUB_CLIENT_ID="your-github-oauth-app-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-app-client-secret"
```

### Configurando o JWT

Além disso, por utilizar JWT, é necessário configurar um `secret`, gerado de forma aleatória, como exemplificado no [arquivo .env.example](./server/.env.example) do projeto `server`:

```
JWT_SECRET="your-jwt-radom-secret"
```

Para gerar o `secret`, é possível utilizar a seguinte função do `openssl`: 
```openssl rand -base64 32```
