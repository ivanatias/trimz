import { type Handlers, type PageProps } from '$fresh/server.ts'
import { Clipboard, Scissor } from 'components/icons.tsx'
import { getUserUrls, shortenUrl } from 'lib/db.ts'

type Props = { urlId: string | null }

export const handler: Handlers<Props> = {
  GET(_req, ctx) {
    return ctx.render({ urlId: null })
  },
  async POST(req, ctx) {
    const formData = await req.formData()
    const urlToShorten = formData.get('url')
    const urlId = await shortenUrl({ originalUrl: urlToShorten as string })
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
        <form
          method='post'
          class='flex flex-col sm:flex-row items-center gap-3 sm:gap-0 justify-center w-full'
        >
          <div class='sm:flex-1 rounded-md shadow-sm w-full'>
            <input
              class='text-sm block w-full py-2 px-4 placeholder-gray-500 placeholder:font-light placeholder:text-sm text-gray-900 rounded-tl-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              type='text'
              placeholder='https://www.example.com'
              name='url'
            />
          </div>
          <button class='flex items-center justify-center gap-2 text-black text-sm w-full sm:w-fit font-semibold border border-emerald-200 bg-emerald-50 p-2 rounded-tr-md hover:bg-emerald-100 transition-colors focus:outline-emerald-300'>
            Trim URL
            <Scissor />
          </button>
        </form>

        {urlId !== null && (
          <div class='w-full max-w-md mt-8'>
            <h2 class='text-lg font-medium text-gray-90 mb-4 text-black'>
              Your Trimmed URL
            </h2>
            <div class='space-y-2'>
              <div class='flex items-center justify-between p-4 rounded-md bg-gradient-to-r from-orange-200 via-rose-200 to-emerald-100'>
                <p class='text-sm text-gray-900 mb-1'>
                  trimz.dev/{urlId}
                </p>
                <button
                  aria-label='Copy URL to clipboard'
                  class='bg-white hover:bg-slate-50 transition-colors rounded-md p-2'
                >
                  <Clipboard />
                </button>
              </div>
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
