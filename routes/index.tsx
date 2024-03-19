export default function Home() {
  return (
    <section class='grid place-content-center h-[calc(100vh-40px)]'>
      <h1 class='text-4xl text-center text-pretty font-semibold mb-6 tracking-wide text-black'>
        Shorten your{' '}
        <span class='bg-gradient-to-r from-orange-300 via-rose-400 to-emerald-300 bg-clip-text text-transparent'>
          URLs
        </span>{' '}
        easily
      </h1>
      <div class='flex flex-col items-center justify-center bg-slate-50 p-6 rounded-lg shadow-md'>
        <div class='flex flex-col sm:flex-row items-center gap-3 sm:gap-0 justify-center w-full'>
          <div class='sm:flex-1 rounded-md shadow-sm w-full'>
            <input
              class='block w-full text-lg py-2 px-4 placeholder-gray-500 placeholder:font-light placeholder:text-sm text-gray-900 rounded-tl-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              type='text'
              placeholder='https://www.example.com'
            />
          </div>
          <button class='text-black text-sm w-full sm:w-fit font-semibold border border-emerald-200 bg-emerald-50 py-3 px-2 rounded-tr-md hover:bg-emerald-100 transition-colors focus:outline-emerald-300'>
            Shorten URL
          </button>
        </div>
        <div class='w-full max-w-md mt-8'>
          <h2 class='text-lg font-medium text-gray-90 mb-4 text-black'>
            Your Shortened URL
          </h2>
          <div class='space-y-4'>
            <div class='flex items-center justify-between bg-gray-100 p-4 rounded-md bg-gradient-to-r from-orange-200 via-rose-200 to-emerald-100'>
              <div>
                <p class='text-sm text-gray-900 mb-1'>
                  short.ly/3rFg4
                </p>
                <p class='text-xs text-gray-500'>Clicked 24 times</p>
              </div>
              <button>
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
