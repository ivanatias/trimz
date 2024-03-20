import type { FreshContext } from '$fresh/server.ts'
import { getSessionId } from 'kv_oauth'
import { getUser } from 'lib/db.ts'

export async function handler(req: Request, ctx: FreshContext) {
  const sessionId = await getSessionId(req)
  if (sessionId === undefined) return await ctx.next()

  ctx.state.sessionId = sessionId
  const user = await getUser({ by: 'sessionId', sessionId })
  if (user !== null) ctx.state.user = user
  return await ctx.next()
}
