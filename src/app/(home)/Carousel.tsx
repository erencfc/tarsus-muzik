"use client";

const C = dynamic(() => import("react-multi-carousel"), {
    ssr: false,
    loading: () => <Loading />,
});
//@ts-ignore
dynamic(() => import("react-multi-carousel/lib/styles.css"), {
    ssr: false,
    loading: () => <Loading />,
});

import dynamic from "next/dynamic";
import Loading from "../loading";

export const Carousel = ({ children }: { children: any }) => {
    return (
        <C
            swipeable
            draggable
            showDots
            ssr
            infinite
            autoPlay
            autoPlaySpeed={5000}
            keyBoardControl
            transitionDuration={800}
            containerClass="py-9 -mt-7 -mb-9 carousel-container cursor-grab"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            responsive={{
                desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 3,
                    slidesToSlide: 3, // optional, default to 1.
                },
                tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 2,
                    slidesToSlide: 2, // optional, default to 1.
                },
                mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                    slidesToSlide: 1, // optional, default to 1.
                },
            }}
        >
            {children}
        </C>
    );
};
