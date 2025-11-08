"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { TimePicker } from '@/components/ui/time-picker'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

interface AssignmentSettingsProps {
    title?: string
    assignmentType: 'simple' | 'live'
    onTypeChange: (type: 'simple' | 'live') => void
    startDate: Date | undefined
    onStartDateChange: (date: Date | undefined) => void
    startTime: string
    onStartTimeChange: (time: string) => void
    endDate: Date | undefined
    onEndDateChange: (date: Date | undefined) => void
    endTime: string
    onEndTimeChange: (time: string) => void
}

export function AssignmentSettings({
    title = 'Untitled',
    assignmentType,
    onTypeChange,
    startDate,
    onStartDateChange,
    startTime,
    onStartTimeChange,
    endDate,
    onEndDateChange,
    endTime,
    onEndTimeChange
}: AssignmentSettingsProps) {
    const [isProctored, setIsProctored] = useState(false)
    const [requireCamera, setRequireCamera] = useState(false)
    const [preventTabSwitch, setPreventTabSwitch] = useState(false)
    const [shuffleQuestions, setShuffleQuestions] = useState(false)
    const [showResults, setShowResults] = useState(true)
    const [showStartCalendar, setShowStartCalendar] = useState(false)
    const [showEndCalendar, setShowEndCalendar] = useState(false)

    const startCalendarRef = useRef<HTMLDivElement>(null)
    const endCalendarRef = useRef<HTMLDivElement>(null)

    // Close calendars when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (startCalendarRef.current && !startCalendarRef.current.contains(event.target as Node)) {
                setShowStartCalendar(false)
            }
            if (endCalendarRef.current && !endCalendarRef.current.contains(event.target as Node)) {
                setShowEndCalendar(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const CheckboxField = ({
        id,
        label,
        description,
        checked,
        onChange
    }: {
        id: string
        label: string
        description?: string
        checked: boolean
        onChange: (checked: boolean) => void
    }) => (
        <div className="flex items-center gap-3">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
            />
            <div className="flex-1">
                <Label htmlFor={id} className="cursor-pointer">{label}</Label>
                {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            </div>
        </div>
    )

    return (
        <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto scrolly">
            <div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-sm text-muted-foreground">Configure your assignment settings</p>
            </div>

            {/* Assignment Type */}
            <Card>
                <CardHeader>
                    <CardTitle>Assignment Type</CardTitle>
                    <CardDescription>Choose how your assignment will be delivered</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={assignmentType} onValueChange={(value: 'simple' | 'live') => onTypeChange(value)}>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Simple Assignment Card */}
                            <div
                                onClick={() => onTypeChange('simple')}
                                className={`p-4 border cursor-pointer transition-all ${assignmentType === 'simple'
                                    ? 'border-foreground bg-muted'
                                    : 'border-muted hover:border-foreground/50'
                                    }`}
                            >
                                <div className="flex items-start gap-2 mb-2">
                                    <RadioGroupItem value="simple" id="simple" className="mt-0.5" />
                                    <Label htmlFor="simple" className="font-semibold text-sm cursor-pointer">Simple Assignment</Label>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Students can take the assignment at any time before the deadline.
                                </p>
                            </div>

                            {/* Live Assignment Card */}
                            <div
                                onClick={() => onTypeChange('live')}
                                className={`p-4 border cursor-pointer transition-all ${assignmentType === 'live'
                                    ? 'border-foreground bg-muted'
                                    : 'border-muted hover:border-foreground/50'
                                    }`}
                            >
                                <div className="flex items-start gap-2 mb-2">
                                    <RadioGroupItem value="live" id="live" className="mt-0.5" />
                                    <Label htmlFor="live" className="font-semibold text-sm cursor-pointer">Live Assignment</Label>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Students must take the assignment during a specific time window.
                                </p>
                            </div>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* Time Settings */}
            {assignmentType === 'live' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Time Settings</CardTitle>
                        <CardDescription>Set when the assignment is available</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Start Date and Time */}
                        <div className="space-y-2 relative">
                            <Label>Start Date & Time</Label>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 justify-start text-left font-normal"
                                    onClick={() => setShowStartCalendar(!showStartCalendar)}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, 'MMM dd, yyyy') : 'Pick a date'}
                                </Button>
                                <div className="w-32">
                                    <TimePicker value={startTime} onChange={onStartTimeChange} />
                                </div>
                            </div>
                            {showStartCalendar && (
                                <div ref={startCalendarRef} className="absolute z-50 top-full mt-2 p-3 border bg-background shadow-lg">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={(date) => {
                                            onStartDateChange(date)
                                            setShowStartCalendar(false)
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* End Date and Time */}
                        <div className="space-y-2 relative">
                            <Label>End Date & Time</Label>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 justify-start text-left font-normal"
                                    onClick={() => setShowEndCalendar(!showEndCalendar)}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, 'MMM dd, yyyy') : 'Pick a date'}
                                </Button>
                                <div className="w-32">
                                    <TimePicker value={endTime} onChange={onEndTimeChange} />
                                </div>
                            </div>
                            {showEndCalendar && (
                                <div ref={endCalendarRef} className="absolute top-full mt-2 z-50 p-3 border bg-background shadow-lg">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={(date) => {
                                            onEndDateChange(date)
                                            setShowEndCalendar(false)
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Proctoring Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Proctoring Options</CardTitle>
                    <CardDescription>Enable supervision features for this assignment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CheckboxField
                        id="proctored"
                        label="Enable Proctoring"
                        description="Monitor student activity during the assignment"
                        checked={isProctored}
                        onChange={setIsProctored}
                    />

                    {isProctored && (
                        <>
                            <div className="border-t pt-4">
                                <CheckboxField
                                    id="require-camera"
                                    label="Require Camera"
                                    description="Student must enable their camera"
                                    checked={requireCamera}
                                    onChange={setRequireCamera}
                                />
                            </div>

                            <div className="border-t pt-4">
                                <CheckboxField
                                    id="prevent-tab-switch"
                                    label="Prevent Tab Switching"
                                    description="Lock browser to assignment tab only"
                                    checked={preventTabSwitch}
                                    onChange={setPreventTabSwitch}
                                />
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Additional Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Additional Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CheckboxField
                        id="shuffle-questions"
                        label="Shuffle Questions"
                        description="Randomize question order for each student"
                        checked={shuffleQuestions}
                        onChange={setShuffleQuestions}
                    />

                    <div className="border-t pt-4">
                        <CheckboxField
                            id="show-results"
                            label="Show Results Immediately"
                            description="Display scores after submission"
                            checked={showResults}
                            onChange={setShowResults}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
