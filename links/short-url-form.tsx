import { Scissor } from 'common/ui/icons.tsx'

const URL_PATTERN =
  '[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?'

export function ShortUrlForm() {
  return (
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
          pattern={URL_PATTERN}
          required
        />
      </div>
      <button class='flex items-center justify-center gap-2 text-black text-sm w-full sm:w-fit font-semibold border border-emerald-200 bg-emerald-50 p-2 rounded-tr-md hover:bg-emerald-100 transition-colors focus:outline-emerald-300'>
        Trim URL
        <Scissor />
      </button>
    </form>
  )
}
