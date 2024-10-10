/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontSize: {
            sm: "0.750rem",
            base: "1rem",
            xl: "1.333rem",
            "2xl": "1.777rem",
            "3xl": "2.369rem",
            "4xl": "3.158rem",
            "5xl": "4.210rem",
        },
        extend: {
            colors: {
                "dark-bg": "#202025",
                "dark-bg-0.95": "rgba(32, 32, 37, 0.95)",
                "dark-bg-0.5": "rgba(32, 32, 37, 0.5)",
                "dark-bg-shade": "#313139",
                "dark-primary": "#DDD2E4",
                "dark-secondary": "#586494",
                "dark-accent": "#868FB9",
                "dark-text": "#D6DCF6",
                "dark-text-0.5": "rgba(226, 228, 238, 0.5)",
            },
        },
        gridTemplateRows: {
            "animate-height-open": "1fr",
            "animate-height-closed": "0fr",
        },
        animation: {
            fadeOut: "fadeOut .5s ease-in-out",
            fadeIn: "fadeIn .5s ease-in-out",
            pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            spin: "spin 1s linear infinite",
        },
        keyframes: {
            fadeOut: {
                "0%": { opacity: 1 },
                "100%": { opacity: 0 },
            },
            fadeIn: {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
            },
            pulse: {
                "0%, 100%": {
                    opacity: 1,
                },
                "50%": {
                    opacity: 0.5,
                },
            },
            spin: {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
            }
        },
    },
    plugins: [],
};
