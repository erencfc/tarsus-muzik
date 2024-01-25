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
                    <CarouselItem
                        key={index}
                        style={{
                            maxHeight: `${height}px !important`,
                        }}
                    >
                        <Image
                            src={`/slider${index + 1}.jpg`}
                            width={width}
                            height={height}
                            style={{
                                maxHeight: `${height}px !important`,
                            }}
                            sizes="(max-width: 1152px) 100vw, 1152px"
                            className={`max-h-[${height}px] h-[${height}px]  max-w-[${width}px] object-cover`}
                            alt=""
                            priority
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 h-10 w-10 bg-gray-800 opacity-60 dark:opacity-60" />
            <CarouselNext className="right-4 h-10 w-10 bg-gray-800 opacity-60 dark:opacity-60" />
        </Carousel>
    );
}
