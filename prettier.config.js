module.exports = {
	jsxSingleQuote: true,
	bracketSameLine: true,
	quoteProps: 'consistent',
	semi: false,
	singleQuote: true,
	tabWidth: 4,
	trailingComma: 'es5',
	useTabs: true,
	plugins: [require('prettier-plugin-tailwindcss')],
	tailwindConfig: './tailwind.config.js',
}
