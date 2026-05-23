import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'

const headingFont = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
})

// Retain name 'mulish' to automatically update all components importing it without breaking code
export const mulish = headingFont.className;
export const bodyClass = bodyFont.className;