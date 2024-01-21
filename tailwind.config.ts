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
    theme: {
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    daisyui: {
        themes: [
            {
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
