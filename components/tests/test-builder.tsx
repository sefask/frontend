"use client"
import { Plus, Trash2, GripVertical, MoveUp, MoveDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Question } from "@/app/user/tests/new/page"

interface TestBuilderProps {
    questions: Question[]
    selectedQuestionId: string | null
    onSelectQuestion: (id: string) => void
    onAddQuestion: (type: Question['type']) => void
    onDeleteQuestion: (id: string) => void
    onReorderQuestions: (startIndex: number, endIndex: number) => void
}

export function TestBuilder({
    questions,
    selectedQuestionId,
    onSelectQuestion,
    onAddQuestion,
    onDeleteQuestion,
    onReorderQuestions,
}: TestBuilderProps) {
    const moveQuestion = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1
        if (newIndex >= 0 && newIndex < questions.length) {
            onReorderQuestions(index, newIndex)
        }
    }

    const getQuestionTypeLabel = (type: Question['type']) => {
        switch (type) {
            case 'multiple-choice':
                return 'Multiple Choice'
            case 'true-false':
                return 'True/False'
            case 'short-answer':
                return 'Short Answer'
            default:
                return type
        }
    }

    return (
        <div className="flex-1 p-4 lg:p-6 space-y-4">
            {/* Add Question Button */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {questions.length} question{questions.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Question
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onAddQuestion('multiple-choice')}>
                            Multiple Choice
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddQuestion('true-false')}>
                            True/False
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddQuestion('short-answer')}>
                            Short Answer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Questions List */}
            {questions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No questions yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Start building your test by adding your first question.
                    </p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>Add Your First Question</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => onAddQuestion('multiple-choice')}>
                                Multiple Choice
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAddQuestion('true-false')}>
                                True/False
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAddQuestion('short-answer')}>
                                Short Answer
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="space-y-3">
                    {questions.map((question, index) => (
                        <Card
                            key={question.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${selectedQuestionId === question.id
                                    ? 'ring-2 ring-primary bg-primary/5'
                                    : ''
                                }`}
                            onClick={() => onSelectQuestion(question.id)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    moveQuestion(index, 'up')
                                                }}
                                                disabled={index === 0}
                                                className="h-6 w-6 p-0"
                                            >
                                                <MoveUp className="w-3 h-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    moveQuestion(index, 'down')
                                                }}
                                                disabled={index === questions.length - 1}
                                                className="h-6 w-6 p-0"
                                            >
                                                <MoveDown className="w-3 h-3" />
                                            </Button>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">Question {index + 1}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {getQuestionTypeLabel(question.type)}
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    {question.points} pt{question.points !== 1 ? 's' : ''}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDeleteQuestion(question.id)
                                        }}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">
                                        {question.text || (
                                            <span className="text-muted-foreground italic">
                                                Click to add question text...
                                            </span>
                                        )}
                                    </p>
                                    {question.type === 'multiple-choice' && question.options && (
                                        <div className="space-y-1">
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="flex items-center gap-2 text-xs">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${question.correctAnswer === optionIndex
                                                                ? 'bg-green-500'
                                                                : 'bg-muted'
                                                            }`}
                                                    />
                                                    <span className={option ? '' : 'text-muted-foreground italic'}>
                                                        {option || 'Empty option'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {question.type === 'true-false' && (
                                        <div className="flex items-center gap-4 text-xs">
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${question.correctAnswer === 'true' ? 'bg-green-500' : 'bg-muted'
                                                        }`}
                                                />
                                                <span>True</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${question.correctAnswer === 'false' ? 'bg-green-500' : 'bg-muted'
                                                        }`}
                                                />
                                                <span>False</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
