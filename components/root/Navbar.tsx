"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Moon, Star, Sun } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const Navbar: React.FC = () => {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Only render theme-dependent content after mounting
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <nav className='w-[95%]  max-w-4xl left-1/2 -translate-x-1/2 fixed top-3 flex items-center gap-3'>
            <div className='w-full h-14 flex items-center justify-between border border-border bg-card  p-3'>
                <div className='flex items-center gap-2'>
                    <div className='bg-primary size-8'></div>
                    <h1 className='font-bold text-lg geist-mono'>Sefask</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant={"ghost"} className='rounded-none transition duration-300 cursor-pointer'>
                        <Star />
                        <span className='max-md:sr-only'>Star</span>
                    </Button>
                    <Button className='cursor-pointer' asChild>
                        <Link href="/auth/signup">
                            Try it out
                        </Link>
                    </Button>
                </div>
            </div>
            <Button variant={"outline"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className='h-14 w-14'>
                {!mounted ? (<Sun />) : theme === "dark" ? (<Sun />) : (<Moon />)}
            </Button>
        </nav>
    )
}

export default Navbar