import { SectionCards } from '@/components/dashboard/section-cards'

const page = async () => {
    return (
        <div className="flex flex-1 flex-col">
            <div>
                <h1 className="px-4 pt-6 text-2xl font-semibold lg:px-6">Dashboard</h1>
                <p className="px-4 text-sm text-muted-foreground lg:px-6">
                    Welcome back! Here is an overview of your account.
                </p>
            </div>
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                </div>
            </div>
        </div>
    )
}

export default page