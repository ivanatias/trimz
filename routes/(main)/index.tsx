import { type Handlers, type PageProps } from '$fresh/server.ts'
import { ShortUrlForm } from 'links/short-url-form.tsx'
import { NonFeaturedLinkCard } from 'links/link-card.tsx'
import { shortenUrl, type User } from 'lib/db.ts'

type Props = { urlId: string | null }

export const handler: Handlers<Props, { user?: User }> = {
  GET(_req, ctx) {
    return ctx.render({ urlId: null })
  },
  async POST(req, ctx) {
    const formData = await req.formData()
    const urlToShorten = formData.get('url')
    const urlId = await shortenUrl({
      originalUrl: urlToShorten as string,
      userId: ctx.state.user?.id,
    })
    return ctx.render({ urlId })
  },
}

export default function Home({ data }: PageProps<Props>) {
  const { urlId } = data
  return (
    <section class='grid place-content-center h-[calc(100vh-40px)]'>
      <h1 class='text-4xl text-center text-pretty font-semibold mb-6 tracking-wide text-black'>
        Trim your{' '}
        <span class='bg-gradient-to-r from-orange-300 via-rose-400 to-emerald-300 bg-clip-text text-transparent'>
          URLs
        </span>{' '}
        easily
      </h1>
      <div class='flex flex-col items-center justify-center bg-slate-50 p-6 rounded-lg shadow-md'>
        <ShortUrlForm />
        {urlId !== null && (
          <div class='w-full max-w-md mt-8'>
            <h2 class='text-lg font-medium text-gray-90 mb-4 text-black'>
              Your Trimmed URL
            </h2>
            <div class='space-y-2'>
              <NonFeaturedLinkCard urlId={urlId} />
              <div class='flex flex-col gap-1 text-gray-600 text-xs text-pretty'>
                <p>
                  This link will expire in 3 days
                </p>
                <p>
                  Sign in to create permanent links and access more features
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
