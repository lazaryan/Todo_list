const yargs = require('yargs').argv

module.exports = api => {
	api.cache(true)

	const isTest = yargs['$0'].includes('jest')

	return {
		plugins: [
			"@babel/plugin-syntax-dynamic-import",
			"@babel/plugin-transform-runtime"
		],
		presets: [
			[
				"@babel/preset-env",
				{
					modules: isTest && 'commonjs' || false
				}
			],
			"@babel/preset-react"
		]
	}
}