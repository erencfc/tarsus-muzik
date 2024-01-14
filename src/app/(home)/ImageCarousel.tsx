"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImageCarousel() {
    const height = 350;
    const width = 1100;
    const imageClass = `max-h-[${height}px] max-w-[${width}px] object-cover`;

    return (
        <Carousel
            className="container mx-auto mt-6 max-h-[350px] max-w-6xl"
            showThumbs={false}
            autoPlay
            interval={10000}
            infiniteLoop
            showStatus={false}
            swipeable={false}
        >
            <div>
                <Image
                    src="/slider5.jpg"
                    className={imageClass}
                    alt=""
                    width={width}
                    height={height}
                    priority={false}
                />
            </div>
            <div>
                <Image
                    src="/slider2.jpg"
                    className={imageClass}
                    alt=""
                    width={width}
                    height={height}
                    priority={false}
                />
            </div>
            <div>
                <Image
                    src="/slider6.jpg"
                    className={imageClass}
                    alt=""
                    width={width}
                    height={height}
                    priority={false}
                />
            </div>
        </Carousel>
    );
}
