import Link from "next/link";
import NewProductForm from "./NewProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NewProductPage() {
    return (
        <div className="flex flex-col gap-2">
            <Link href="/admin/dashboard/products" className="w-fit">
                <Button variant="outline" size="sm">
                    <i>
                        <ArrowLeftIcon width={20} height={20} />
                    </i>
                    <span className="ml-2">Geri Dön</span>
                </Button>
            </Link>
            <NewProductForm />
        </div>
    );
}
