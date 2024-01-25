import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SideMenu from "./SideMenu";

export default function InfoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto mb-24 flex max-w-6xl flex-col gap-4 px-4 py-6">
            {/* TODO: breadcrumb */}
            <div className="flex flex-row gap-8">
                <div className="flex-1">
                    <Card className="border-gray-200 bg-base-100 text-gray-700 shadow-md dark:border-gray-200 dark:bg-base-100 dark:text-gray-700">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-800">
                                Menü
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SideMenu />
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-[3]">
                    <Card className="min-h-full border-gray-200 bg-base-100 px-4 py-8 text-gray-700 shadow-md dark:border-gray-200 dark:bg-base-100 dark:text-gray-700">
                        <CardContent>{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
