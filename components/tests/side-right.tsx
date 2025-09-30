import * as React from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Question } from "@/app/user/tests/new/page"

interface SidebarRightProps extends React.ComponentProps<typeof Sidebar> {
    selectedQuestion?: Question
    onUpdateQuestion?: (id: string, updates: Partial<Question>) => void
    onChangeQuestionType?: (id: string, newType: Question['type']) => void
    onAddQuestion?: () => void
}export function SidebarRight({
    selectedQuestion,
    onUpdateQuestion,
    onChangeQuestionType,
    onAddQuestion,
    ...props
}: SidebarRightProps) {
    const updateQuestion = (updates: Partial<Question>) => {
        if (selectedQuestion && onUpdateQuestion) {
            onUpdateQuestion(selectedQuestion.id, updates)
        }
    }

    const updateOption = (index: number, value: string) => {
        if (selectedQuestion?.options) {
            const newOptions = [...selectedQuestion.options]
            newOptions[index] = value
            updateQuestion({ options: newOptions })
        }
    }

    const addOption = () => {
        if (selectedQuestion?.options) {
            updateQuestion({ options: [...selectedQuestion.options, ''] })
        }
    }

    const removeOption = (index: number) => {
        if (selectedQuestion?.options && selectedQuestion.options.length > 2) {
            const newOptions = selectedQuestion.options.filter((_, i) => i !== index)
            const correctAnswer = selectedQuestion.correctAnswer as number
            let newCorrectAnswer = correctAnswer

            if (correctAnswer === index) {
                newCorrectAnswer = 0
            } else if (correctAnswer > index) {
                newCorrectAnswer = correctAnswer - 1
            }

            updateQuestion({
                options: newOptions,
                correctAnswer: newCorrectAnswer
            })
        }
    }

    return (
        <Sidebar
            collapsible="none"
            className="sticky top-0 hidden h-svh border-l lg:flex"
            {...props}
        >
            <SidebarHeader className="border-sidebar-border h-24 p-4 border-b">
                <div>
                    <h2 className="font-semibold">
                        {selectedQuestion ? 'Edit Question' : 'Test Editor'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {selectedQuestion
                            ? 'Modify the selected question below.'
                            : 'Select a question to edit or add a new one.'}
                    </p>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-4">
                {!selectedQuestion ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-2">No question selected</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Click on a question in the main area to edit it, or add a new question.
                        </p>
                        <Button size="sm" onClick={() => onAddQuestion?.()}>Add Question</Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Question Text */}
                        <div className="space-y-2">
                            <Label htmlFor="question-text">Question Text</Label>
                            <Textarea
                                id="question-text"
                                placeholder="Enter your question here..."
                                value={selectedQuestion.text}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateQuestion({ text: e.target.value })}
                                rows={3}
                            />
                        </div>

                        {/* Question Type */}
                        <div className="space-y-2">
                            <Label htmlFor="question-type">Question Type</Label>
                            <Select
                                value={selectedQuestion.type}
                                onValueChange={(value: Question['type']) => onChangeQuestionType?.(selectedQuestion.id, value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="short-answer">Short Answer</SelectItem>
                                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                    <SelectItem value="true-false">True/False</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>                        {/* Points */}
                        <div className="space-y-2">
                            <Label htmlFor="points">Points</Label>
                            <Input
                                id="points"
                                type="number"
                                min="1"
                                value={selectedQuestion.points}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion({ points: parseInt(e.target.value) || 1 })}
                            />
                        </div>

                        {/* Question Type Specific Options */}
                        {selectedQuestion.type === 'multiple-choice' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Answer Options</Label>
                                    <div className="space-y-2">
                                        {selectedQuestion.options?.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <RadioGroup
                                                    value={selectedQuestion.correctAnswer?.toString()}
                                                    onValueChange={(value: string) => updateQuestion({ correctAnswer: parseInt(value) })}
                                                >
                                                    <RadioGroupItem value={index.toString()} />
                                                </RadioGroup>
                                                <Input
                                                    placeholder={`Option ${index + 1}`}
                                                    value={option}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateOption(index, e.target.value)}
                                                />
                                                {selectedQuestion.options && selectedQuestion.options.length > 2 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeOption(index)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addOption}
                                        className="w-full"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Option
                                    </Button>
                                </div>
                            </div>
                        )}

                        {selectedQuestion.type === 'true-false' && (
                            <div className="space-y-2">
                                <Label>Correct Answer</Label>
                                <RadioGroup
                                    value={selectedQuestion.correctAnswer as string}
                                    onValueChange={(value: string) => updateQuestion({ correctAnswer: value })}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="true" id="true" />
                                        <Label htmlFor="true">True</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="false" id="false" />
                                        <Label htmlFor="false">False</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        {selectedQuestion.type === 'short-answer' && (
                            <div className="space-y-2">
                                <Label htmlFor="correct-answer">Sample Answer (Optional)</Label>
                                <Textarea
                                    id="correct-answer"
                                    placeholder="Enter a sample correct answer..."
                                    value={selectedQuestion.correctAnswer as string || ''}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateQuestion({ correctAnswer: e.target.value })}
                                    rows={2}
                                />
                                <p className="text-xs text-muted-foreground">
                                    This will be used for grading reference.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </SidebarContent>
        </Sidebar>
    )
}
