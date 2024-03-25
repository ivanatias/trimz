import { defineLayout } from '$fresh/server.ts'
import { UserDropdown } from 'auth/user-dropdown.tsx'
import { LoginDropdown } from 'auth/login-dropdown.tsx'
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

function Navbar({ user }: { user?: User }) {
  const isLoggedIn = user !== undefined
  return (
    <header class='flex justify-center pt-5'>
      <nav class='fixed w-full flex items-center justify-between max-w-4xl px-5'>
        <a
          class='text-5xl italic bg-gradient-to-r from-orange-300 via-rose-400 to-emerald-300 bg-clip-text text-transparent'
          href='/'
          title='Go to homepage'
        >
          trimz.
        </a>
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
