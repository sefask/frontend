"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface AssignmentBuilderHeaderProps {
    questionCount: number
    totalPoints: number
    onSave?: () => void
    isSaving?: boolean
}

export function AssignmentBuilderHeader({
    questionCount,
    totalPoints,
    onSave,
    isSaving = false
}: AssignmentBuilderHeaderProps) {
    return (
        <header className="w-full border-b bg-background">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-8 w-8"
                    >
                        <Link href="/assignments">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex gap-3 items-center">
                        <h1 className="text-lg font-semibold">Create Assignment</h1>
                        <p className="text-xs bg-foreground/15 p-1 px-2 text-muted-foreground">
                            {questionCount} question{questionCount !== 1 ? 's' : ''} • {totalPoints} point{totalPoints !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        asChild
                    >
                        <Link href="/user/assignments">Cancel</Link>
                    </Button>
                    <Button
                        onClick={onSave}
                        disabled={isSaving || questionCount === 0}
                        className="gap-2"
                    >
                        <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save Assignment'}</span>
                        <span className="sm:hidden">{isSaving ? 'Saving...' : 'Save'}</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
