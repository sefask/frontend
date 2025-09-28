"use client"
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { ChartAreaGradient } from './area-chart'
import { useState } from 'react'
import { Calendar } from '../ui/calendar'

const cardData = [
    {
        description: "Total Revenue",
        title: "$1,250.00",
        trend: {
            value: "+12.5%",
            type: "up" as const,
        },
        footer: {
            text: "Trending up this month",
            icon: "down" as const,
            subtitle: "Visitors for the last 6 months"
        }
    },
    {
        description: "New Customers",
        title: "1,234",
        trend: {
            value: "-20%",
            type: "down" as const,
        },
        footer: {
            text: "Down 20% this period",
            icon: "down" as const,
            subtitle: "Acquisition needs attention"
        }
    },
    {
        description: "Active Accounts",
        title: "45,678",
        trend: {
            value: "+12.5%",
            type: "up" as const,
        },
        footer: {
            text: "Strong user retention",
            icon: "up" as const,
            subtitle: "Engagement exceed targets"
        }
    },
    {
        description: "Growth Rate",
        title: "4.5%",
        trend: {
            value: "+4.5%",
            type: "up" as const,
        },
        footer: {
            text: "Steady performance increase",
            icon: "up" as const,
            subtitle: "Meets growth projections"
        }
    }
]

const testScheduleData = [
    {
        title: "React Performance test",
        time: "2025-09-15T15:00:00.000Z",
        displayTime: "Oct 15, 3:00 PM"
    },
    {
        title: "Django test",
        time: "2025-09-24T14:30:00.000Z",
        displayTime: "Oct 24, 2:30 PM"
    },
    {
        title: "Real test",
        time: "2025-09-05T16:45:00.000Z",
        displayTime: "Nov 5, 4:45 PM"
    },
    {
        title: "Fake test",
        time: "2025-09-02T13:15:00.000Z",
        displayTime: "Nov 12, 1:15 PM"
    }
]

export function SectionCards() {
    const [dates, setDates] = useState<Date[]>(
        testScheduleData.map(test => new Date(test.time))
    )

    return (
        <div className="grid grid-cols-1 gap-4 grid-rows-[auto,1fr] px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {cardData.map((card, index) => (
                <Card key={index} className="@container/card">
                    <CardHeader>
                        <CardDescription>{card.description}</CardDescription>
                        <CardTitle className="font-semibold tabular-nums @[250px]/card:text-3xl">
                            {card.title}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                {card.trend.type === "up" ? <TrendingUp /> : <TrendingDown />}
                                {card.trend.value}
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {card.footer.text} {card.footer.icon === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                        </div>
                        <div className="text-muted-foreground">
                            {card.footer.subtitle}
                        </div>
                    </CardFooter>
                </Card>
            ))}
            <ChartAreaGradient />
            <Card className='col-span-2'>
                <CardHeader>
                    <CardTitle>Test schedule</CardTitle>
                    <CardDescription className="mb-4">Your test schedule for the next month</CardDescription>
                    <CardAction>
                        <Badge variant="outline" className="mb-2">5 Upcoming Tests</Badge>
                    </CardAction>
                </CardHeader>
                <CardContent className='grid grid-cols-2 max-md:grid-cols-1 gap-4'>
                    <div>
                        <div className='flex flex-col h-full justify-between mb-4'>
                            {testScheduleData.map((test, index) => (
                                <div key={index} className='bg-muted/50 p-3 border border-border'>
                                    <h4 className='font-medium'>{test.title}</h4>
                                    <p className='text-muted-foreground text-sm'>{test.displayTime}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Calendar
                        mode="multiple"
                        numberOfMonths={1}
                        defaultMonth={dates[0]}
                        required
                        selected={dates}
                        onSelect={setDates}
                        max={5}
                        className="border shadow-sm w-full"
                    />
                </CardContent>
            </Card>
        </div>
    )
}
