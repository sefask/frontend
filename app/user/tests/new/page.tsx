"use client"
import { SidebarRight } from '@/components/tests/side-right'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TestBuilder } from '@/components/tests/test-builder'
import React, { useState } from 'react'

export interface Question {
    id: string
    type: 'multiple-choice' | 'true-false' | 'short-answer'
    text: string
    points: number
    options?: string[]
    correctAnswer?: string | number
}

const Page = () => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)

    const addQuestion = () => {
        const newQuestion: Question = {
            id: `q-${Date.now()}`,
            type: 'short-answer',
            text: '',
            points: 1,
            correctAnswer: ''
        }
        setQuestions(prev => [...prev, newQuestion])
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

    return (
        <SidebarProvider>
            <SidebarInset>
                <div className="flex flex-col h-full">
                    <div className="border-b lg:h-24">
                        <h1 className="px-4 pt-6 pb-2 text-2xl font-semibold lg:px-6">Test Builder</h1>
                        <p className="px-4 pb-4 text-sm text-muted-foreground lg:px-6">
                            Create and manage your test questions. Click on a question to edit it.
                        </p>
                    </div>
                    <TestBuilder
                        questions={questions}
                        selectedQuestionId={selectedQuestionId}
                        onSelectQuestion={setSelectedQuestionId}
                        onAddQuestion={addQuestion}
                        onDeleteQuestion={deleteQuestion}
                        onReorderQuestions={reorderQuestions}
                    />
                </div>
            </SidebarInset>
            <SidebarRight
                selectedQuestion={selectedQuestion}
                onUpdateQuestion={updateQuestion}
                onChangeQuestionType={changeQuestionType}
                onAddQuestion={addQuestion}
            />
        </SidebarProvider>
    )
}

export default Page