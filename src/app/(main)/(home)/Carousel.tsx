"use client";
import Loading from "@/app/loading";
const EmblaCarousel = dynamic(
    () => import("@/components/ui/carousel").then((c) => c.Carousel),
    {
        loading: () => <Loading />,
    }
);
const CarouselContent = dynamic(
    () => import("@/components/ui/carousel").then((c) => c.CarouselContent),
    {
        loading: () => <Loading />,
    }
);
const CarouselNext = dynamic(
    () => import("@/components/ui/carousel").then((c) => c.CarouselNext),
    {
        loading: () => <Loading />,
    }
);
const CarouselPrevious = dynamic(
    () => import("@/components/ui/carousel").then((c) => c.CarouselPrevious),
    {
        loading: () => <Loading />,
    }
);
import Autoplay from "embla-carousel-autoplay";
import dynamic from "next/dynamic";

export default function Carousel({ children }: { children: React.ReactNode }) {
    return (
        <EmblaCarousel
            plugins={[Autoplay({ delay: 10000 })]}
            opts={{
                align: "start",
                loop: true,
                skipSnaps: true,
                slidesToScroll: "auto",
            }}
            className="p-2 text-white"
        >
            <CarouselContent className="ml-0.5">{children}</CarouselContent>
            <CarouselPrevious className="left-3.5 h-10 w-10 dark:opacity-60" />
            <CarouselNext className="right-3 h-10 w-10 dark:opacity-60" />
        </EmblaCarousel>
    );
}
