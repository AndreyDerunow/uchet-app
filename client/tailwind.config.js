/** @type {import('tailwindcss').Config} */

const MAIN = "#2d0643";
const SEC = "#5F2580";
const THIRD = "#7109AA";
const BUTTON = "#AD66D5";
const BUTTON_BOTTOM = "#9F3ED5";

const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx}"],

    theme: {
        colors: {
            ...colors,
            mainColor: MAIN,
            secColor: SEC,
            thirdColor: THIRD,
            button: BUTTON,
            buttonBottom: BUTTON_BOTTOM
        },
        extend: {
            animation: {
                "bounce-x1": "bounceLoader 1s ease-in infinite",
                "bounce-x2": "bounceLoader 1s ease-in .1s infinite",
                "bounce-x3": "bounceLoader 1s ease-in .2s infinite",
                spinFetch: "spinLoader 1s linear infinite",
                textShy: "textOpacity 4s linear 1 normal forwards"
            },
            keyframes: {
                bounceLoader: {
                    "0%, 100%": { transform: "translateY(-50%)" },
                    "40%": { transform: "translateY(50%)" },
                    "55%": { transform: "translateY(10%)" },
                    "70%": { transform: "translateY(50%)" }
                },
                spinLoader: {
                    "0%": { transform: "rotate3d(0,0,1,360deg)" },
                    "100%": { transform: "rotate3d(0,0,0,0deg)" }
                },
                textOpacity: {
                    "0%": { opacity: "0" },
                    "40%": { opacity: "0.33" },
                    "55%": { opacity: "0.52" },
                    "70%": { opacity: "0.65" },
                    "100%": { opacity: "0.87" }
                }
            }
        }
    },

    plugins: []
};
