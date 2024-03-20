import { type Handlers } from '$fresh/server.ts'
import { signIn } from 'kv_oauth'
import { githubOauthConfig } from 'lib/auth.ts'

export const handler: Handlers = {
  GET(req) {
    return signIn(req, githubOauthConfig)
  },
}
