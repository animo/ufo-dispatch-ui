// base size
const size = 16

export const textSize = {
  s: size * 0.8,
  m: size * 1,
  l: size * 1.5,
  xl: size * 2,
  xxl: size * 3,
}

export const titleSize = {
  s: size * 1.8,
  m: size * 2,
  l: size * 2.5,
  xl: size * 3,
  xxl: size * 4,
}

export const COLORNAMES = [
  'text',
  'text-subdued',
  'background',
  'background-color',
  'warning',
  'error',
  'info',
  'primary',
  'accent',
] as const

export const INVALID_MESSAGE = 'Dit veld is vereist'

export type ColorNames = typeof COLORNAMES[number]
export type TextSize = keyof typeof textSize
