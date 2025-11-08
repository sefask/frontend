"use client"
import { SidebarRight } from './side-right'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AssignmentBuilder } from './assignment-builder'
import { AssignmentBuilderHeader } from './assignment-builder-header'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Check, Router, X } from 'lucide-react'
import { AssignmentSettings } from './assignment-settings'
import { useRouter } from 'next/navigation'

export interface Question {
    id: string
    type: 'multiple-choice' | 'true-false' | 'short-answer'
    text: string
    points: number
    options?: string[]
    correctAnswer?: string | number
}

type TabType = 'questions' | 'settings'

interface AssignmentData {
    title: string
    description: string
    type: 'simple' | 'live'
    questions: Omit<Question, 'id'>[]
    startTime?: string
    endTime?: string
}

const AssignmentBuilderContainer = () => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [assignmentTitle, setAssignmentTitle] = useState('')
    const [assignmentDescription, setAssignmentDescription] = useState('')
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const [editDescValue, setEditDescValue] = useState('')
    const [activeTab, setActiveTab] = useState<TabType>('questions')
    const router = useRouter();

    // Settings state
    const [assignmentType, setAssignmentType] = useState<'simple' | 'live'>('simple')
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [startTime, setStartTime] = useState('')
    const [endDate, setEndDate] = useState<Date | undefined>()
    const [endTime, setEndTime] = useState('')

    const addQuestion = (afterIndex?: number) => {
        const newQuestion: Question = {
            id: `q-${Date.now()}`,
            type: 'short-answer',
            text: '',
            points: 1,
            correctAnswer: ''
        }
        setQuestions(prev => {
            const updated = [...prev]
            // If afterIndex is provided, insert at that position; otherwise append
            if (afterIndex !== undefined && afterIndex >= 0 && afterIndex <= updated.length) {
                updated.splice(afterIndex, 0, newQuestion)
            } else {
                updated.push(newQuestion)
            }
            return updated
        })
        setSelectedQuestionId(newQuestion.id)
    }

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q))
    }

    const changeQuestionType = (id: string, newType: Question['type']) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === id) {
                const baseQuestion = { ...q, type: newType }

                // Set appropriate defaults based on new type
                switch (newType) {
                    case 'multiple-choice':
                        return {
                            ...baseQuestion,
                            options: ['', '', '', ''],
                            correctAnswer: 0
                        }
                    case 'true-false':
                        return {
                            ...baseQuestion,
                            options: undefined,
                            correctAnswer: 'true'
                        }
                    case 'short-answer':
                        return {
                            ...baseQuestion,
                            options: undefined,
                            correctAnswer: ''
                        }
                    default:
                        return baseQuestion
                }
            }
            return q
        }))
    }

    const deleteQuestion = (id: string) => {
        setQuestions(prev => prev.filter(q => q.id !== id))
        if (selectedQuestionId === id) {
            setSelectedQuestionId(null)
        }
    }

    const reorderQuestions = (startIndex: number, endIndex: number) => {
        const result = Array.from(questions)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        setQuestions(result)
    }

    const selectedQuestion = questions.find(q => q.id === selectedQuestionId)

    const handleSaveAssignment = async () => {
        try {
            setIsSaving(true)

            // Validate that we have questions
            if (questions.length === 0) {
                toast.error('Please add at least one question')
                return
            }

            // Validate question details
            const questionErrors: string[] = []
            questions.forEach((q, index) => {
                if (!q.text.trim()) {
                    questionErrors.push(`Question ${index + 1}: Missing question text`)
                }
                if (q.type === 'multiple-choice' && (!q.options || q.options.filter(o => o.trim()).length < 2)) {
                    questionErrors.push(`Question ${index + 1}: Multiple choice needs at least 2 options`)
                }
                if (q.type === 'short-answer' && !q.correctAnswer) {
                    questionErrors.push(`Question ${index + 1}: Missing correct answer`)
                }
            })

            if (questionErrors.length > 0) {
                questionErrors.forEach(err => toast.error(err))
                return
            }

            // Map frontend questions to backend format (remove temporary ids)
            const questionsForBackend = questions.map(q => ({
                type: q.type,
                text: q.text,
                points: q.points,
                options: q.options,
                correctAnswer: q.correctAnswer
            }))

            // Prepare the assignment data
            const assignmentData: AssignmentData = {
                title: assignmentTitle || 'Untitled Assignment',
                description: assignmentDescription || 'No description provided',
                type: assignmentType,
                questions: questionsForBackend
            }

            // Add time fields if live assignment
            if (assignmentType === 'live') {
                if (!startDate || !startTime) {
                    toast.error('Start date and time are required for live assignments')
                    return
                }
                if (!endDate || !endTime) {
                    toast.error('End date and time are required for live assignments')
                    return
                }

                // Combine date and time
                const [startHours, startMinutes] = startTime.split(':')
                const [endHours, endMinutes] = endTime.split(':')

                const startDateTime = new Date(startDate)
                startDateTime.setHours(parseInt(startHours), parseInt(startMinutes))

                const endDateTime = new Date(endDate)
                endDateTime.setHours(parseInt(endHours), parseInt(endMinutes))

                assignmentData.startTime = startDateTime.toISOString()
                assignmentData.endTime = endDateTime.toISOString()
            }

            // Make API call to save assignment
            const response = await fetch('/api/assignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignmentData)
            })

            const result = await response.json()

            if (!response.ok) {
                // Show all validation errors
                if (result.errors) {
                    if (typeof result.errors === 'object' && !Array.isArray(result.errors)) {
                        // Object of errors (field-level)
                        Object.entries(result.errors).forEach(([field, message]) => {
                            if (message) {
                                toast.error(`${field}: ${message}`)
                            }
                        })
                    } else if (Array.isArray(result.errors)) {
                        // Array of errors (questions)
                        result.errors.forEach((err: { index?: number; errors?: Record<string, string> }) => {
                            if (typeof err.index === 'number' && err.errors) {
                                Object.entries(err.errors).forEach(([field, message]) => {
                                    if (message) {
                                        toast.error(`Question ${err.index! + 1} - ${field}: ${message}`)
                                    }
                                })
                            }
                        })
                    }
                } else {
                    toast.error(result.message || 'Failed to save assignment')
                }
                return
            }

            toast.success('Assignment saved successfully!')
            router.push('/assignments')
            console.log('Assignment saved:', result)
        } catch (error) {
            console.error('Error saving assignment:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to save assignment')
        } finally {
            setIsSaving(false)
        }
    }

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)

    return (
        <div className="flex flex-col bg-red-200 h-[681.5px] overflow-hidden w-full">
            <AssignmentBuilderHeader
                questionCount={questions.length}
                totalPoints={totalPoints}
                onSave={handleSaveAssignment}
                isSaving={isSaving}
                title={assignmentTitle}
                onTitleChange={setAssignmentTitle}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <SidebarProvider>
                <SidebarInset className='h-[613px] overflow-hidden'>
                    {activeTab === 'questions' ? (
                        <div className='h-full overflow-y-auto scrolly'>
                            {/* Description Section */}
                            <div className="px-6 pt-6 pb-4">
                                {isEditingDescription ? (
                                    <div className="relative mb-4">
                                        <Textarea
                                            autoFocus
                                            value={editDescValue}
                                            onChange={(e) => setEditDescValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Escape') {
                                                    setIsEditingDescription(false)
                                                    setEditDescValue(assignmentDescription)
                                                }
                                            }}
                                            placeholder="Add a description or instructions for your assignment... (optional)"
                                            className="min-h-24 text-sm p-3 break-all"
                                        />
                                        <div className="absolute top-full mt-3 right-2 flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setIsEditingDescription(false)
                                                    setEditDescValue(assignmentDescription)
                                                }}
                                                className="h-8 w-8 p-0"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setIsEditingDescription(false)
                                                    setAssignmentDescription(editDescValue)
                                                }}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => {
                                            setIsEditingDescription(true)
                                            setEditDescValue(assignmentDescription)
                                        }}
                                        className="hover:bg-muted p-3 cursor-text transition-colors"
                                    >
                                        {assignmentDescription ? (
                                            <p className="text-sm text-foreground whitespace-pre-wrap">{assignmentDescription}</p>
                                        ) : (
                                            <p className="text-sm text-muted-foreground italic">
                                                Click to add a description or instructions for your assignment... (optional)
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <AssignmentBuilder
                                questions={questions}
                                selectedQuestionId={selectedQuestionId}
                                onSelectQuestion={setSelectedQuestionId}
                                onAddQuestion={addQuestion}
                                onDeleteQuestion={deleteQuestion}
                                onReorderQuestions={reorderQuestions}
                            />
                        </div>
                    ) : (
                        <AssignmentSettings
                            title={assignmentTitle}
                            assignmentType={assignmentType}
                            onTypeChange={setAssignmentType}
                            startDate={startDate}
                            onStartDateChange={setStartDate}
                            startTime={startTime}
                            onStartTimeChange={setStartTime}
                            endDate={endDate}
                            onEndDateChange={setEndDate}
                            endTime={endTime}
                            onEndTimeChange={setEndTime}
                        />
                    )}
                </SidebarInset>
                {activeTab === 'questions' && (
                    <SidebarRight
                        className='w-96 h-[613px] overflow-y-auto'
                        selectedQuestion={selectedQuestion}
                        onUpdateQuestion={updateQuestion}
                        onChangeQuestionType={changeQuestionType}
                        onAddQuestion={addQuestion}
                    />
                )}
            </SidebarProvider>
        </div>
    )
}

export default AssignmentBuilderContainer
