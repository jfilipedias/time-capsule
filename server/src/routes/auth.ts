import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const authURL = new URL('https://github.com/login/oauth/access_token')
    authURL.searchParams.append('code', code)
    authURL.searchParams.append(
      'client_id',
      String(process.env.GITHUB_CLIENT_ID),
    )
    authURL.searchParams.append(
      'client_secret',
      String(process.env.GITHUB_CLIENT_SECRET),
    )

    const accessTokenResponse = await fetch(authURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })

    const { access_token } = await accessTokenResponse.json()

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(await userResponse.json())

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatar_url: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return { token }
  })
}
