import { Facebook, GitHub, Google } from 'components/icons.tsx'

const PROVIDERS = [
  {
    name: 'GitHub',
    href: '/sign-in/github',
    className:
      'text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2',
    icon: <GitHub />,
  },
  {
    name: 'Google',
    href: '/sign-in/google',
    className:
      'text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 me-2 mb-2',
    icon: <Google />,
  },
  {
    name: 'Facebook',
    href: '/sign-in/facebook',
    className:
      'text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#3b5998]/55 me-2 mb-2',
    icon: <Facebook />,
  },
]

export default function SignIn() {
  return (
    <section class='h-svh grid place-content-center px-4'>
      <div class='flex flex-col py-5 px-10 gap-10 bg-slate-50 rounded-lg shadow-sm'>
        <h1 class='text-4xl text-center text-pretty font-bold'>
          Sign in to{' '}
          <span class='italic bg-gradient-to-r from-orange-300 via-rose-400 to-emerald-300 bg-clip-text text-transparent'>
            trimz.
          </span>
        </h1>
        <ul class='flex flex-col gap-3 items-center justify-center w-full'>
          {PROVIDERS.map(({ name, href, icon, className }) => (
            <li key={name}>
              <a
                href={href}
                class={`${className} min-w-[230px]`}
              >
                {icon}
                Sign in with {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
