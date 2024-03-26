import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'twMerge'

export function mergeClasses(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}
