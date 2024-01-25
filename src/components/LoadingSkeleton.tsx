import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <div className="grid w-full lg:grid-cols-[280px_1fr]">
            <aside className="hidden h-96 rounded-lg border border-gray-300 p-6 lg:block">
                <div className="space-y-4">
                    <Skeleton className="h-3 w-[200px] bg-gray-300 dark:bg-gray-300" />
                    <Skeleton className="h-3 w-[160px] bg-gray-300 dark:bg-gray-300" />
                    <Skeleton className="h-3 w-[160px] bg-gray-300 dark:bg-gray-300" />
                    <Skeleton className="h-3 w-[160px] bg-gray-300 dark:bg-gray-300" />
                    <Skeleton className="h-3 w-[160px] bg-gray-300 dark:bg-gray-300" />
                </div>
            </aside>
            <main className="flex flex-col gap-8 px-6">
                <div className="space-y-6">
                    <br />
                    <br />
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card
                            key={i}
                            className="space-y-6 border-none bg-base-100 text-gray-800 dark:border-none dark:bg-base-100 dark:text-gray-800"
                        >
                            <Skeleton className="mx-auto h-3 w-[180px] bg-gray-300 dark:bg-gray-300" />

                            <Skeleton className="h-48 w-full bg-gray-300 dark:bg-gray-300" />
                            <div className="flex flex-col items-center justify-center gap-6">
                                <Skeleton className="h-3 w-[180px] bg-gray-300 dark:bg-gray-300" />
                                <Skeleton className="h-3 w-[120px] bg-gray-300 dark:bg-gray-300" />
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
