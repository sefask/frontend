"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Moon, Star, Sun } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import logoLight from '@/public/img/logo-light.svg'
import logoDark from '@/public/img/logo-dark.svg'
import Image from 'next/image'

const Navbar: React.FC = () => {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Only render theme-dependent content after mounting
    useEffect(() => {
        setMounted(true)
    }, [])

    const logo = mounted ? (theme === "dark" ? logoDark : logoLight) : null

    return (
        <nav className='w-[95%]  max-w-4xl left-1/2 -translate-x-1/2 fixed top-3 flex items-center gap-3'>
            <div className='w-full h-14 flex items-center justify-between border border-border bg-card  p-3'>
                <div className='flex items-center gap-2'>
                    <div className='bg-primary size-8'>
                        {mounted && (
                            <Image src={logo} alt='Sefask Logo' className='p-1' />
                        )}
                    </div>
                    <h1 className='font-bold text-lg geist-mono'>Sefask</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant={"ghost"} className='rounded-none transition duration-300 cursor-pointer' asChild>
                        <Link href={"https://github.com/sefask/frontend"} target='_blank'>
                            <Star />
                            <span className='max-md:sr-only'>Star</span>
                        </Link>
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