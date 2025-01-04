/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'], // Ajoutez la police Roboto
				michroma: ['Michroma', 'serif'], // Ajoutez la police Michroma
			},
		},
	},
	plugins: [],
}
