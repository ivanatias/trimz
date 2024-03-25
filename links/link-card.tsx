import { Clipboard } from 'common/ui/icons.tsx'
import { BASE_URL } from 'links/consts.ts'
import { type StoredUrlData } from 'lib/db.ts'

export function NonFeaturedLinkCard({ urlId }: { urlId: string }) {
  return (
    <div class='flex items-center justify-between p-4 rounded-md bg-gradient-to-r from-orange-200 via-rose-200 to-emerald-100'>
      <p class='text-sm text-gray-900 mb-1'>
        {BASE_URL}/{urlId}
      </p>
      <button
        aria-label='Copy URL to clipboard'
        class='bg-white hover:bg-slate-50 transition-colors rounded-md p-2'
      >
        <Clipboard />
      </button>
    </div>
  )
}

export function FeaturedLinkCard({ url }: { url: StoredUrlData }) {
  return (
    <div class='flex flex-col gap-2 p-3 bg-white shadow-sm rounded-md'>
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
    </div>
  )
}
