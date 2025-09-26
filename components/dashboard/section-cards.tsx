import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { ChartAreaGradient } from './area-chart'

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

export function SectionCards() {
    return (
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {cardData.map((card, index) => (
                <Card key={index} className="@container/card">
                    <CardHeader>
                        <CardDescription>{card.description}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
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
            <div className='col-span-2'>
                <ChartAreaGradient />
            </div>
        </div>
    )
}
