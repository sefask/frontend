"use client"

import { AssignmentsList } from '@/components/assignments/assignments-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const page = () => {
    return (
        <main className="flex flex-1 flex-col">
            <div className="px-4 pt-6 lg:px-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-semibold">Assignments</h1>
                    <Button asChild>
                        <Link href="/assignments/new">
                            <Plus />
                            New Assignment
                        </Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Here you can create and manage your assignments.
                </p>
            </div>

            <div className="px-4 lg:px-6 pb-6">
                <AssignmentsList />
            </div>
        </main>
    )
}

export default page