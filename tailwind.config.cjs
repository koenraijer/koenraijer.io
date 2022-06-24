const typography = require('@tailwindcss/typography');
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

    variants: {
        textOpacity: ['group-hover'],
        height: ['responsive', 'hover', 'focus']
      },
    darkMode: 'class',
	theme: {
		fluidType: {
            // your fluid type settings
            // works only with unitless numbers
            // This numbers are the defaults settings
            settings: {
                fontSizeMin: 1.05, // 1.125rem === 18px
                fontSizeMax: 1.125, // 1.25rem === 20px
                ratioMin: 1.175, // Multiplicator Min
                ratioMax: 1.25, // Multiplicator Max
                screenMin: 20, // 20rem === 320px
                screenMax: 96, // 96rem === 1536px
                unit: 'rem', // default is rem but it's also possible to use 'px'
                prefix: '' // set a prefix to use it alongside the default font sizes
            },
            // Creates the text-xx classes
            // This are the default settings and analog to the tailwindcss defaults
            // Each `lineHeight` is set unitless and we think that's the way to go especially in context with fluid type.
            values: {
                'xs': [-2, 1.75],
                'sm': [-1, 1.75],
                'base': [0, 1.75],
                'lg': [1, 1.6],
                'xl': [2, 1.2],
                '2xl': [3, 1.2],
                '3xl': [4, 1.2],
                '4xl': [5, 1.1],
                '5xl': [6, 1.1],
                '6xl': [7, 1.1],
                '7xl': [8, 1],
                '8xl': [9, 1],
                '9xl': [10, 1],
            }
        },

		extend: {
            transitionProperty: {
                'height': 'height'
            },
            gridTemplateColumns: {
                'main': 'minmax(60%, 60ch) 1fr',
            },
            gridTemplateRows: {
                'featuredRows': 'minmax(auto, 25vh) minmax(50%, auto)'
            },
        }
	},

    daisyui: {
        themes: [
            {
              night: {
                "primary": "#2989FF", // "#595cff",
                "secondary": "#FFC457",
                "tertiary": "#CAFF57",
                "accent": "#F471B5",
                "neutral": "#1E293B",
                "neutral-focus": "#273449",
                "base-100": "#FFF",
                "info": "#0CA5E9",
                "success": "#CAFF57", // Actually tertiary!
                "warning": "#F4BF50",
                "error": "#FB7085",
                "neutral-content": "#555555",
                "--rounded-badge": "0.25rem",
              },
            },
          ],
    },
	plugins: [typography, require('daisyui'), require('tailwindcss-fluid-type')]
};

module.exports = config;
// F8F8FF