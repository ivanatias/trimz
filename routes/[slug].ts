import { type Handlers } from '$fresh/server.ts'
import { getUrlById, updateUrl } from 'lib/db.ts'

export const handler: Handlers = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug
    const url = await getUrlById(slug)

    if (url === null) return ctx.renderNotFound()
    await updateUrl({ ...url, visits: url.visits + 1 })
    return new Response(`Redirecting to ${url.originalUrl}`, {
      status: 302,
      headers: {
        Location: url.originalUrl,
      },
    })
  },
}
