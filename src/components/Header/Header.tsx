"use client";

import { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";

export default function Header() {
    const [windowSize, setWindowSize] = useState<{
        width: number | undefined;
        height: number | undefined;
    }>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log(windowSize);

    return (
        <>
            {(windowSize.width || 1920) > 1280 ? (
                <span>
                    <div className="container m-auto">desktop</div>
                    {/* <Navbar /> */}
                </span>
            ) : (
                <span>
                    <div className="container m-auto">
                        {/* <HeaderTop /> */}
                        mobile
                    </div>
                    {/* <Navbar /> */}
                </span>
            )}
        </>
    );
}
