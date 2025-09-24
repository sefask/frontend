import React from 'react'
import { Button } from '../ui/button'
import { Star } from 'lucide-react'
import Link from 'next/link'

const Navbar: React.FC = () => {
    return (
        <nav className='w-[95%] flex items-center justify-between border-border max-w-4xl bg-card left-1/2 -translate-x-1/2 border fixed top-3 p-3'>
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
        </nav>
    )
}

export default Navbar