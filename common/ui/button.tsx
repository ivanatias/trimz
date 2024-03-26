import { type ComponentChildren, type JSX } from 'preact'
import { cva, type VariantProps } from 'cva'
import { mergeClasses } from 'lib/utils.ts'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm text-black font-semibold transition-colors focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-emerald-100 text-black hover:bg-emerald-200',
        secondary: 'bg-orange-50 hover:bg-orange-100',
        ghost: 'bg-slate-50 hover:bg-slate-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-6 w-6 px-2 py-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type Props =
  & JSX.HTMLAttributes<HTMLButtonElement>
  & VariantProps<typeof buttonVariants>

export function Button(
  { children, className, variant, size, ...restOfProps }: Props,
) {
  return (
    <button
      class={mergeClasses(buttonVariants({ variant, size, className }))}
      {...restOfProps}
    >
      {children}
    </button>
  )
}
