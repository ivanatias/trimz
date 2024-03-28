import { type JSX, toChildArray } from 'preact'
import { mergeClasses } from 'lib/utils.ts'

type ElementProps =
  & JSX.HTMLAttributes<HTMLHeadingElement>
  & JSX.HTMLAttributes<HTMLSpanElement>
  & JSX.HTMLAttributes<HTMLParagraphElement>
  & JSX.HTMLAttributes<HTMLDivElement>
  & JSX.HTMLAttributes<HTMLButtonElement>
  & JSX.HTMLAttributes<HTMLAnchorElement>

type ExtractedElement = Extract<
  keyof JSX.IntrinsicElements,
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'div'
  | 'span'
  | 'button'
  | 'a'
>

type Props = Omit<ElementProps, 'class'> & {
  version?: 'lighter' | 'darker'
  element?: ExtractedElement
}

export function BrandGradient(
  {
    children,
    element: Element = 'span',
    version = 'lighter',
    className,
    ...restOfProps
  }: Props,
) {
  const isText = toChildArray(children).every((child) =>
    typeof child === 'string'
  )

  return (
    <Element
      class={mergeClasses(
        'bg-gradient-to-r',
        version === 'lighter' && 'from-orange-200 via-rose-200 to-emerald-100',
        version === 'darker' && 'from-orange-300 via-rose-400 to-emerald-300',
        isText && 'bg-clip-text text-transparent',
        className,
      )}
      {...restOfProps}
    >
      {children}
    </Element>
  )
}
