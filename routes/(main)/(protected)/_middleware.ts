import { type FreshContext } from '$fresh/server.ts'
import { type User } from 'lib/db.ts'

export async function handler(
  _req: Request,
  ctx: FreshContext<{ user?: User }>,
) {
  const isLoggedIn = ctx.state.user !== undefined

  if (!isLoggedIn) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  }

  return await ctx.next()
}
