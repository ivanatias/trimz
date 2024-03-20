import { defineLayout } from '$fresh/server.ts'
import { Navbar } from 'components/navbar.tsx'
import { Footer } from 'components/footer.tsx'
import { type User } from 'lib/db.ts'

export default defineLayout<{ sessionId?: string; user?: User }>(
  (_req, { Component, state }) => {
    return (
      <div class='py-5'>
        <Navbar user={state.user} />
        <main class='max-w-4xl mx-auto px-5'>
          <Component />
        </main>
        <Footer />
      </div>
    )
  },
)
