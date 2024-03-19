export function Navbar() {
  return (
    <header class='flex justify-center'>
      <nav class='fixed w-full flex items-center justify-between max-w-5xl px-5'>
        <a
          class='font-bold text-3xl italic text-black'
          href='/'
          title='Go to homepage'
        >
          trimz.
        </a>
        <a class='font-bold text-lg text-black' href='#'>
          Sign in
        </a>
      </nav>
    </header>
  )
}
