"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ImageCarousel() {
    const height = 300;
    const width = 1152;

    return (
        <Carousel
            plugins={[Autoplay({ delay: 8000 })]}
            opts={{
                align: "start",
                loop: true,
            }}
            className="mx-auto max-w-6xl text-white"
            style={{
                maxHeight: `${height}px !important`,
            }}
        >
            <CarouselContent
                style={{
                    maxHeight: `${height}px !important`,
                }}
            >
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className={`max-h-[${height}px]`}>
                        <Image
                            src={`/slider${index + 1}.jpg`}
                            width={width}
                            height={height}
                            style={{
                                maxHeight: `${height}px !important`,
                            }}
                            objectFit="cover"
                            className={`max-h-[${height}px]  max-w-[${width}px] object-cover`}
                            alt=""
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 h-10 w-10 dark:opacity-60" />
            <CarouselNext className="right-4 h-10 w-10 dark:opacity-60" />
        </Carousel>
    );
}
