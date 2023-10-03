"use client"

import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'


const ThemeProvider = ({ children, ...props }) => {
    return (
        <div>
            <NextThemeProvider {...props}>
                {children}
            </NextThemeProvider>
        </div>
    )
}

export default ThemeProvider
