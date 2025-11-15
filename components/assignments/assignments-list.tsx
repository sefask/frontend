"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import logoLight from '@/public/img/logo-light.svg'
import logoDark from '@/public/img/logo-dark.svg'
import { LayoutGrid, List, Trash2, Edit2, Loader } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import useFetch from '@/utils/useFetch'
import Image from 'next/image'
import { useTheme } from 'next-themes'

interface Assignment {
    _id: string
    title: string
    type: 'simple' | 'live'
    startTime?: string
    endTime?: string
    isActive?: boolean
    questionCount?: number
    totalPoints?: number
    createdAt: string
}

type LayoutMode = 'grid' | 'list'

export function AssignmentsList() {
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid')
    const { data, loading, errors, fetchData } = useFetch()
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Pick logo — default to light before mount
    const logo = theme === 'dark' ? logoLight : logoDark

    useEffect(() => {
        fetchAssignments()
        setMounted(true)
    }, [])

    const fetchAssignments = async () => {
        const result = await fetchData('/api/assignments')
        if (result?.data) {
            setAssignments(result.data)
        } else if (errors) {
            toast.error('Failed to load assignments')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this assignment?')) return

        try {
            const response = await fetch(`/api/assignments/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Failed to delete assignment')
            }

            setAssignments(assignments.filter(a => a._id !== id))
            toast.success('Assignment deleted successfully')
        } catch (error) {
            console.error('Error deleting assignment:', error)
            toast.error('Failed to delete assignment')
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="inset-0 h-96 flex items-center justify-center bg-background">
                <div className="flex flex-col items-center text-muted-foreground gap-4">
                    <Image src={logo} alt="Sefask Logo" className="size-20" />
                    <Loader className="size-4 animate-spin" />
                </div>
            </div>
        )
    }

    if (errors && assignments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-lg font-medium mb-2">Error Loading Assignments</h3>
                <p className="text-muted-foreground mb-4">{typeof errors === 'string' ? errors : 'Failed to load assignments'}</p>
                <Button onClick={fetchAssignments}>Try Again</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header with Layout Toggle */}
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'} created
                </p>

                <div className="flex gap-2 bg-muted p-1 border border-border">
                    <Button
                        variant={layoutMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setLayoutMode('grid')}
                        className="gap-2"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        Grid
                    </Button>
                    <Button
                        variant={layoutMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setLayoutMode('list')}
                        className="gap-2"
                    >
                        <List className="w-4 h-4" />
                        List
                    </Button>
                </div>
            </div>

            {/* Empty State */}
            {assignments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-muted flex items-center justify-center mb-4">
                        <List className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Create your first assignment to get started.
                    </p>
                    <Button asChild>
                        <Link href="/assignments/new">
                            Create Assignment
                        </Link>
                    </Button>
                </div>
            ) : layoutMode === 'grid' ? (
                // Grid Layout
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assignments.map((assignment) => (
                        <Card
                            key={assignment._id}
                            className="shadow-none cursor-pointer"
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="line-clamp-2">
                                        {assignment.title}
                                    </CardTitle>
                                    <div className='bg-green-500/20 rounded-full animate-pulse p-1'>
                                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 text-sm">
                                    <p className="flex gap-4 text-muted-foreground">
                                        <span>{assignment.questionCount || 0} questions</span>
                                        <span>•</span>
                                        <span>{assignment.totalPoints || 0} points</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Created {formatDate(assignment.createdAt)}
                                    </p>
                                </div>

                                {assignment.type === 'live' && assignment.startTime && (
                                    <div className="pt-2 border-t">
                                        <p className="text-xs text-muted-foreground">
                                            {formatDate(assignment.startTime)} - {formatDate(assignment.endTime || '')}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 pt-2">
                                    <Link href={`/assignments/${assignment._id}`} className="">
                                        <Button variant="secondary" size="sm" className="gap-2">
                                            <Edit2 className="w-4 h-4" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(assignment._id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                // List Layout
                <div className="space-y-2">
                    {assignments.map((assignment) => (
                        <Card
                            key={assignment._id}
                            className="shadow-none p-4 cursor-pointer"
                        >
                            <CardContent className="p-0">
                                <div className="flex max-md:flex-col md:items-center justify-between gap-4">
                                    <div className="">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold line-clamp-1">
                                                {assignment.title}
                                            </h3>
                                            <div className='bg-green-500/20 rounded-full animate-pulse p-1'>
                                                <div className="bg-green-500 rounded-full w-2 h-2"></div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-xs text-muted-foreground">
                                            <span>{assignment.questionCount || 0} questions</span>
                                            <span>•</span>
                                            <span>{assignment.totalPoints || 0} points</span>
                                            <span>•</span>
                                            <span>{formatDate(assignment.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex self-end gap-2 shrink-0">
                                        <Link href={`/assignments/${assignment._id}`}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Edit2 className="w-4 h-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(assignment._id)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
