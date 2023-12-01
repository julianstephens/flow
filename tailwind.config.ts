import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: [
        "./src/**/*.tsx",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-pt)", ...fontFamily.sans],
                logo: ["var(--font-monts-alt)"],
                accent: ["var(--font-monts)"],
            },
            colors: {
                bg: "#f9f9f9",
                black: "#212529",
                blue: "#264498",
                grey: "#898f9f",
                "grey-light": "#e5e8eb",
                "grey-dark": "#575d6b",
                gold: "#f3a738",
                "green-soft": "#68a691",
                red: "#eb5757",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
} satisfies Config;
