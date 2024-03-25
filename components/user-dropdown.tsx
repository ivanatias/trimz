import { ChevronRight, DoorOut, Url } from 'components/icons.tsx'

const DROPDOWN_ITEMS = [
  {
    text: 'My URLs',
    href: '/my-urls',
    title: 'Go to my URLs panel',
    icon: <Url />,
  },
  {
    text: 'Sign out',
    href: '/sign-out',
    title: 'Sign out',
    icon: <DoorOut />,
  },
]

export function UserDropdown(
  { username, userImageSrc }: { username: string; userImageSrc: string },
) {
  return (
    <details class='group relative cursor-pointer'>
      <summary class='flex items-center'>
        <div class='flex items-center gap-2'>
          <span class='group-open:[&_svg]:rotate-90 group-[&_svg]:transition-transform ml-8'>
            <ChevronRight />
          </span>
          <div class='flex items-center gap-2'>
            <img
              src={userImageSrc}
              class='w-10 h-10 rounded-full'
              alt={`${username}'s profile image`}
            />
            <span class='font-bold text-sm lg:text-base'>{username}</span>
          </div>
        </div>
      </summary>
      <ul class='flex flex-col gap-2 absolute border border-slate-100 p-2 top-[52px] -left-[34px] lg:left-0 min-w-[200px] rounded-lg'>
        {DROPDOWN_ITEMS.map(({ text, href, title, icon }) => (
          <li key={href}>
            <a
              key={href}
              href={href}
              class='flex items-center gap-2 w-full text-sm text-black font-semibold bg-white hover:bg-slate-50 shadow-sm p-2 rounded-sm transition-colors'
              title={title}
            >
              {icon}
              {text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
