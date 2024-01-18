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
import React, { Suspense } from "react";

export default function Carousel({
    children,
    autoplayDelay = 8000,
}: {
    children: React.ReactNode;
    autoplayDelay?: number;
}) {
    return (
        <EmblaCarousel
            plugins={[Autoplay({ delay: autoplayDelay })]}
            opts={{
                align: "start",
                loop: true,
                skipSnaps: true,
                slidesToScroll: "auto",
            }}
            className="p-2 text-white"
        >
            <CarouselContent>{children}</CarouselContent>
            <CarouselPrevious className="left-4 h-10 w-10 dark:opacity-60" />
            <CarouselNext className="right-4 h-10 w-10 dark:opacity-60" />
        </EmblaCarousel>
    );
}
