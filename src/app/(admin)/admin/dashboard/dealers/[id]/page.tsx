import Loading from "@/app/loading";
import { Suspense } from "react";
import DealerDetails from "./DealerDetails";

export default function DealerDetailsPage({
    params: { id },
    searchParams: { page, q },
}: {
    params: { id: string };
    searchParams: { page: string; q: string };
}) {
    return (
        <Suspense fallback={<Loading />}>
            <DealerDetails id={id} page={page} q={q} />
        </Suspense>
    );
}
