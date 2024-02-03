import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ViewProductPage({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <div className="space-y-2">
            <Link href={`/admin/dashboard/products`} className="w-fit">
                <Button variant="outline" size="sm">
                    <i>
                        <ArrowLeftIcon width={20} height={20} />
                    </i>
                    <span className="ml-2">Geri Dön</span>
                </Button>
            </Link>
            <h1>YAPIM AŞAMASINDA</h1>
        </div>
    );
}
