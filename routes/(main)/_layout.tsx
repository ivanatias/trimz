import { defineLayout } from '$fresh/server.ts'
import { UserDropdown } from 'auth/user-dropdown.tsx'
import { LoginDropdown } from 'auth/login-dropdown.tsx'
import { BrandGradient } from 'common/ui/brand-gradient.tsx'
import { Heart } from 'common/ui/icons.tsx'
import { type User } from 'lib/db.ts'

export default defineLayout<{ sessionId?: string; user?: User }>(
  (_req, { Component, state }) => {
    return (
      <>
        <Navbar user={state.user} />
        <main class='max-w-4xl mx-auto px-5'>
          <Component />
        </main>
        <Footer />
      </>
    )
  },
)

function Footer() {
  return (
    <footer class='flex justify-center w-full py-3 fixed bottom-0 z-20 bg-white'>
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

function Navbar({ user }: { user?: User }) {
  const isLoggedIn = user !== undefined
  return (
    <header class='flex justify-center'>
      <nav class='fixed w-full flex items-center justify-between max-w-4xl px-5 py-4 z-20 bg-white'>
        <BrandGradient
          element='a'
          className='text-5xl italic'
          href='/'
          title='Go to homepage'
          version='darker'
        >
          trimz
        </BrandGradient>
        {isLoggedIn
          ? (
            <UserDropdown
              username={user.login}
              userImageSrc={user.avatar_url}
            />
          )
          : <LoginDropdown />}
      </nav>
    </header>
  )
}
