"use client"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Question } from "@/components/tests/test-builder-container"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

interface TestBuilderProps {
    questions: Question[]
    selectedQuestionId: string | null
    onSelectQuestion: (id: string) => void
    onAddQuestion: () => void
    onDeleteQuestion: (id: string) => void
    onReorderQuestions: (startIndex: number, endIndex: number) => void
}export function TestBuilder({
    questions,
    selectedQuestionId,
    onSelectQuestion,
    onAddQuestion,
    onDeleteQuestion,
    onReorderQuestions,
}: TestBuilderProps) {
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return
        onReorderQuestions(result.source.index, result.destination.index)
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
                <Button onClick={onAddQuestion}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                </Button>
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
                    <Button onClick={onAddQuestion}>Add Your First Question</Button>
                </div>
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-3"
                            >
                                {questions.map((question, index) => (
                                    <Draggable key={question.id} draggableId={question.id} index={index}>
                                        {(provided, snapshot) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`cursor-pointer transition-all ${selectedQuestionId === question.id
                                                    ? 'border-foreground/60'
                                                    : ''
                                                    } ${snapshot.isDragging ? 'shadow-lg rotate-2' : ''}`}
                                                onClick={() => onSelectQuestion(question.id)}
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className="cursor-grab border-border border hover:bg-muted p-2 active:cursor-grabbing"
                                                            >
                                                                <GripVertical className="w-4 h-4 text-muted-foreground" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">Question {index + 1}</span>
                                                                    <Badge variant="secondary" className="text-xs max-lg:hidden">
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
                                                                            className={`w-2 h-2 rounded-none ${question.correctAnswer === optionIndex
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
                                                                        className={`w-2 h-2 rounded-none ${question.correctAnswer === 'true' ? 'bg-green-500' : 'bg-muted'
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
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    )
}
