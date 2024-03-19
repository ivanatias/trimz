import { defineLayout } from '$fresh/server.ts'
import { Navbar } from 'components/navbar.tsx'
import { Footer } from 'components/footer.tsx'

export default defineLayout((_req, { Component }) => {
  return (
    <div class='py-5'>
      <Navbar />
      <main class='max-w-5xl mx-auto px-5'>
        <Component />
      </main>
      <Footer />
    </div>
  )
})
