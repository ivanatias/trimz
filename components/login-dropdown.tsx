import { ChevronRight } from 'components/icons.tsx'
import { Facebook, GitHub, Google } from 'components/icons.tsx'

const PROVIDERS = [
  {
    name: 'GitHub',
    href: '/sign-in/github',
    className:
      'text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 w-full',
    icon: <GitHub />,
  },
  {
    name: 'Google',
    href: '/sign-in/google',
    className:
      'text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 w-full',
    icon: <Google />,
  },
  {
    name: 'Facebook',
    href: '/sign-in/facebook',
    className:
      'text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#3b5998]/55 w-full',
    icon: <Facebook />,
  },
]

export function LoginDropdown() {
  return (
    <details class='group relative cursor-pointer'>
      <summary class='flex items-center gap-2 font-bold text-sm lg:text-base'>
        <span class='group-open:[&_svg]:rotate-90 group-[&_svg]:transition-transform ml-8'>
          <ChevronRight />
        </span>
        Sign in
      </summary>
      <ul class='flex flex-col justify-center items-center gap-3 p-4 absolute border border-slate-100 top-[40px] w-[250px] -left-[140px] lg:-left-[70px] rounded-lg'>
        {PROVIDERS.map(({ name, href, icon, className }) => (
          <li key={name} class='w-full'>
            <a
              href={href}
              class={className}
            >
              {icon}
              Sign in with {name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
