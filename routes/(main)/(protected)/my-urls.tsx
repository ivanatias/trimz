import { type Handlers, type PageProps } from '$fresh/server.ts'
import { FeaturedLinkCard } from 'links/link-card.tsx'
import { getUserUrls, type StoredUrlData, type User } from 'lib/db.ts'

type Props = { urls: StoredUrlData[] }

export const handler: Handlers<Props, { user: User }> = {
  async GET(_req, ctx) {
    const urls = await getUserUrls(ctx.state.user.id)
    return ctx.render({ urls })
  },
}

export default function MyUrls({ data }: PageProps<Props>) {
  return (
    <section class='flex flex-col gap-5 pt-24'>
      <h1 class='font-bold text-3xl lg:text-4xl'>My URLs</h1>
      <div class='flex flex-col gap-8 bg-slate-50 shadow-md p-4 rounded-lg'>
        <ul class='flex flex-col gap-4 max-h-[calc(100vh-240px)] overflow-y-scroll'>
          {data.urls.map((url) => (
            <li key={url.urlId}>
              <FeaturedLinkCard url={url} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
