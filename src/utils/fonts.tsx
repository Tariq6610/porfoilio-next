import {Mulish, } from 'next/font/google'

 const mulishFont = Mulish({
    weight: ['700'], // Specify the weight you want to use
    style: ['normal'], // Specify the style (normal or italic)
    subsets: ['latin', 'latin-ext'], // Choose available subsets for the font
    display: 'swap', // Control the font-display strategy
    variable: '--font-mulish', // Optional: Define a CSS custom property for the font
    preload: true, // Preload the font for faster performance
    
})

export const mulish = mulishFont.className;