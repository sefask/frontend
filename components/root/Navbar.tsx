import React from 'react'
import { Button } from '../ui/button'
import { Plus, Star } from 'lucide-react'

const Navbar: React.FC = () => {
    return (
        <div className='w-full flex items-center justify-between border-border max-w-4xl bg-card left-1/2 -translate-x-1/2 border fixed top-4 p-3'>
            <div className='flex items-center gap-2'>
                <div className='bg-primary w-8 h-8'></div>
                <h1 className='font-bold text-lg geist-mono'>Sefask</h1>
            </div>
            <div className='flex items-center gap-2'>
                <Button variant={"ghost"} className='rounded-none transition duration-300 cursor-pointer'>
                    <Star /> Star
                </Button>
                <Button className='rounded-none cursor-pointer'>
                    <Plus /> Join waitlist
                </Button>
            </div>
        </div>
    )
}

export default Navbar