"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface TimePickerProps {
    value: string
    onChange: (time: string) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [hours, setHours] = React.useState(() => {
        const [h] = value.split(":") || ["00"]
        return h || "00"
    })
    const [minutes, setMinutes] = React.useState(() => {
        const parts = value.split(":")
        return parts[1] || "00"
    })
    const pickerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        setHours(value.split(":")[0] || "00")
        setMinutes(value.split(":")[1] || "00")
    }, [value])

    // Close picker when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "")
        const limitedVal = val.length > 2 ? val.slice(0, 2) : val
        const hour = Math.min(parseInt(limitedVal || "0"), 23)
        const newHours = String(hour).padStart(2, "0")
        setHours(newHours)
    }

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "")
        const limitedVal = val.length > 2 ? val.slice(0, 2) : val
        const minute = Math.min(parseInt(limitedVal || "0"), 59)
        const newMinutes = String(minute).padStart(2, "0")
        setMinutes(newMinutes)
    }

    const handleConfirm = () => {
        const newTime = `${hours}:${minutes}`
        onChange(newTime)
        setIsOpen(false)
    }

    const handleHourWheel = (offset: number) => {
        const newHour = (parseInt(hours) + offset + 24) % 24
        setHours(String(newHour).padStart(2, "0"))
    }

    const handleMinuteWheel = (offset: number) => {
        const newMinute = (parseInt(minutes) + offset + 60) % 60
        setMinutes(String(newMinute).padStart(2, "0"))
    }

    return (
        <div ref={pickerRef} className="relative">
            <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Clock className="mr-2 h-4 w-4" />
                {value}
            </Button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 z-50 w-80 bg-background border shadow-lg p-4">
                    {/* Type Input Mode */}
                    <div className="mb-4">
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">
                            Type Time
                        </label>
                        <div className="flex gap-2 items-center">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="HH"
                                    value={hours}
                                    onChange={handleHourChange}
                                    maxLength={2}
                                    className="text-center text-lg font-semibold"
                                />
                            </div>
                            <div className="text-xl font-bold">:</div>
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="MM"
                                    value={minutes}
                                    onChange={handleMinuteChange}
                                    maxLength={2}
                                    className="text-center text-lg font-semibold"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <label className="text-xs font-medium text-muted-foreground mb-3 block">
                            Scroll to Adjust
                        </label>

                        {/* Clock Wheel Style Selector */}
                        <div className="flex justify-center items-center gap-4">
                            {/* Hours */}
                            <div className="flex flex-col items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleHourWheel(1)}
                                    className="mb-2"
                                >
                                    ↑
                                </Button>
                                <div className="h-24 w-16 flex items-center justify-center text-3xl font-bold border bg-muted">
                                    {hours}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleHourWheel(-1)}
                                    className="mt-2"
                                >
                                    ↓
                                </Button>
                            </div>

                            {/* Separator */}
                            <div className="text-3xl font-bold">:</div>

                            {/* Minutes */}
                            <div className="flex flex-col items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleMinuteWheel(1)}
                                    className="mb-2"
                                >
                                    ↑
                                </Button>
                                <div className="h-24 w-16 flex items-center justify-center text-3xl font-bold border bg-muted">
                                    {minutes}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleMinuteWheel(-1)}
                                    className="mt-2"
                                >
                                    ↓
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleConfirm}
                            className="flex-1"
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
