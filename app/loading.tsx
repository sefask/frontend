"use client"
import React, { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { useTheme } from 'next-themes'
import logoLight from '@/public/img/logo-light.svg'
import logoDark from '@/public/img/logo-dark.svg'
import Image from 'next/image'

export default function Loading() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Pick logo — default to light before mount
  const logo = theme === 'dark' ? logoLight : logoDark

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center text-muted-foreground gap-4">
        <Image src={logo} alt="Sefask Logo" className="size-20" />
        <Loader className="size-4 animate-spin" />
      </div>
    </div>
  )
}
