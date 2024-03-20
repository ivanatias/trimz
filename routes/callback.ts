import { type Handlers } from '$fresh/server.ts'
import { handleCallback } from 'kv_oauth'
import { githubOauthConfig } from 'lib/auth.ts'
import {
  createOrUpdateUser,
  deleteUserBySessionId,
  getUser,
  type User,
} from 'lib/db.ts'

export const handler: Handlers = {
  async GET(req) {
    const { response, sessionId, tokens } = await handleCallback(
      req,
      githubOauthConfig,
    )

    const ghResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `${tokens.tokenType} ${tokens.accessToken}`,
      },
    })

    if (!ghResponse.ok) {
      throw new Error('Failed to retrieve GitHub user data')
    }

    const { id, login, name, avatar_url }: Omit<User, 'sessionId'> =
      await ghResponse.json()
    const userInKv = await getUser({ by: 'userId', userId: id })

    if (userInKv !== null) {
      await deleteUserBySessionId(userInKv.sessionId)
    }
    await createOrUpdateUser({ id, login, name, avatar_url, sessionId })
    return response
  },
}
