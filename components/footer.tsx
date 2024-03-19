import { Heart } from 'components/icons.tsx'

export function Footer() {
  return (
    <footer class='flex justify-center fixed bottom-3 w-full'>
      <p class='text-sm text-center text-gray-600 flex items-center gap-1'>
        Made with{' '}
        <span class='text-rose-500'>
          <Heart />
        </span>{' '}
        by{' '}
        <a
          class='underline font-semibold text-rose-700'
          href='https://github.com/ivanatias'
          rel='noopener noreferrer'
          target='_blank'
          title='Ivan Atias on GitHub'
        >
          Ivan Atias
        </a>
      </p>
    </footer>
  )
}
