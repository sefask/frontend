"use client"
import { SidebarRight } from './side-right'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AssignmentBuilder } from './assignment-builder'
import { AssignmentBuilderHeader } from './assignment-builder-header'
import React, { useState } from 'react'
import { toast } from 'sonner'

export interface Question {
    id: string
    type: 'multiple-choice' | 'true-false' | 'short-answer'
    text: string
    points: number
    options?: string[]
    correctAnswer?: string | number
}

const AssignmentBuilderContainer = () => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)

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

            // Map frontend questions to backend format (remove temporary ids)
            const questionsForBackend = questions.map(q => ({
                type: q.type,
                text: q.text,
                points: q.points,
                options: q.options,
                correctAnswer: q.correctAnswer
            }))

            // For now, just log the data
            // TODO: Replace with actual API call
            console.log('Saving assignment:', {
                questions: questionsForBackend,
                totalPoints: questions.reduce((sum, q) => sum + q.points, 0)
            })

            toast.success('Assignment saved successfully!')
        } catch (error) {
            console.error('Error saving assignment:', error)
            toast.error('Failed to save assignment')
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
            />
            <SidebarProvider>
                <SidebarInset className='h-[613px] overflow-y-auto scrolly'>
                    <AssignmentBuilder
                        questions={questions}
                        selectedQuestionId={selectedQuestionId}
                        onSelectQuestion={setSelectedQuestionId}
                        onAddQuestion={addQuestion}
                        onDeleteQuestion={deleteQuestion}
                        onReorderQuestions={reorderQuestions}
                    />
                </SidebarInset>
                <SidebarRight
                    className='w-96 h-[613px] overflow-y-auto'
                    selectedQuestion={selectedQuestion}
                    onUpdateQuestion={updateQuestion}
                    onChangeQuestionType={changeQuestionType}
                    onAddQuestion={addQuestion}
                />
            </SidebarProvider>
        </div>
    )
}

export default AssignmentBuilderContainer
