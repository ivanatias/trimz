import { type Handlers, type PageProps } from '$fresh/server.ts'
import { Clipboard } from 'components/icons.tsx'
import { getUserUrls, type StoredUrlData, type User } from 'lib/db.ts'
import { BASE_URL } from 'consts/urls.ts'

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
            <li class='flex flex-col gap-2 p-3 bg-white shadow-sm rounded-md'>
              <div class='flex items-center justify-between'>
                <div class='flex items-center gap-3'>
                  <a
                    class='text-sm lg:text-base font-semibold text-emerald-700 hover:underline'
                    href={`${BASE_URL}/${url.urlId}`}
                    rel='noopener noreferrer'
                    title={`Visit shortened URL: ${BASE_URL}/${url.urlId}`}
                    target='_blank'
                  >
                    {BASE_URL}/{url.urlId}
                  </a>
                  <button
                    aria-label='Copy URL to clipboard'
                    class='bg-slate-50 hover:bg-slate-100 transition-colors rounded-md p-2'
                  >
                    <Clipboard />
                  </button>
                </div>
                <span class='text-xs lg:text-sm'>
                  Visited {url.visits} times
                </span>
              </div>
              <div class='flex items-center gap-2 text-xs lg:text-sm'>
                <span>3h ago</span>
                <a
                  href={url.originalUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  class='font-medium hover:underline truncate max-w-[200px] md:max-w-sm lg:max-w-lg'
                  title={`Visit original URL: ${url.originalUrl}`}
                >
                  {url.originalUrl}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
