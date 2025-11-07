"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, FileQuestionMark, Save, Settings } from 'lucide-react'
import Link from 'next/link'
import { Input } from '../ui/input'

interface AssignmentBuilderHeaderProps {
    questionCount: number
    totalPoints: number
    onSave?: () => void
    isSaving?: boolean
    title?: string
    onTitleChange?: (title: string) => void
    activeTab?: 'questions' | 'settings'
    onTabChange?: (tab: 'questions' | 'settings') => void
}

export function AssignmentBuilderHeader({
    questionCount,
    totalPoints,
    onSave,
    isSaving = false,
    title = '',
    onTitleChange,
    activeTab = 'questions',
    onTabChange
}: AssignmentBuilderHeaderProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(title)
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
                        {isEditing ? (
                            <input
                                className='p-1 h-max w-max outline-0 border-b border-foreground'
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => {
                                    setIsEditing(false)
                                    if (editValue.trim()) {
                                        onTitleChange?.(editValue.trim())
                                    } else {
                                        setEditValue(title)
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setIsEditing(false)
                                        if (editValue.trim()) {
                                            onTitleChange?.(editValue.trim())
                                        } else {
                                            setEditValue(title)
                                        }
                                    } else if (e.key === 'Escape') {
                                        setIsEditing(false)
                                        setEditValue(title)
                                    }
                                }}
                            />
                        ) : (
                            <h1
                                className="text-lg font-semibold cursor-text hover:bg-muted p-1 px-2 transition-colors"
                                onClick={() => {
                                    setIsEditing(true)
                                    setEditValue(title)
                                }}
                            >
                                {title || <span className="text-muted-foreground italic">Click to add title...</span>}
                            </h1>
                        )}
                        <p className="text-xs bg-foreground/15 p-1 px-2 text-muted-foreground">
                            {questionCount} question{questionCount !== 1 ? 's' : ''} • {totalPoints} point{totalPoints !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        variant={activeTab === 'settings' ? 'outline' : 'ghost'}
                        onClick={() => onTabChange?.(activeTab === 'settings' ? 'questions' : 'settings')}
                    >
                        {activeTab !== 'settings' ? <Settings className="h-4 w-4" /> : <FileQuestionMark className="h-4 w-4" />}
                        <span>{activeTab === 'settings' ? 'Questions' : 'Settings'}</span>
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
