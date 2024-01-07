import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        require("daisyui"),
        require("tailwindcss-animate"),
        require("tailwindcss-animate"),
    ],
    daisyui: {
        themes: [
            {
                // darkTheme: {
                //     primary: "#4800ff",
                //     secondary: "#43039c",
                //     accent: "#803c00",
                //     neutral: "#27212b",
                //     "base-100": "#171717",
                //     info: "#0090c4",
                //     success: "#009c56",
                //     warning: "#e59200",
                //     error: "#ff0339",
                // },
                // darkTheme2: {
                //     primary: "#009eff",
                //     secondary: "#00ba00",
                //     accent: "#00a7ff",
                //     neutral: "#070804",
                //     "base-100": "#222222",
                //     info: "#00a5ff",
                //     success: "#7cc500",
                //     warning: "#ff8f00",
                //     error: "#f9223e",
                // },
                lightTheme: {
                    primary: "#006eff",
                    secondary: "#00d6ff",
                    accent: "#0092e6",
                    neutral: "#070d0b",
                    "base-100": "#fff6ff",
                    info: "#00f5ff",
                    success: "#00de7c",
                    warning: "#ffc500",
                    error: "#ff7886",
                },
            },
        ],
    },
};
export default config;
