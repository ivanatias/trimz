export function Navbar() {
  return (
    <header class='flex justify-center'>
      <nav class='fixed w-full flex items-center justify-between max-w-4xl px-5'>
        <a
          class='text-5xl italic bg-gradient-to-r from-orange-300 via-rose-400 to-emerald-300 bg-clip-text text-transparent'
          href='/'
          title='Go to homepage'
        >
          trimz.
        </a>
        <a class='font-bold text-lg text-black' href='/sign-in'>
          Sign in
        </a>
      </nav>
    </header>
  )
}
