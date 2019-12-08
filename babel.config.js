const yargs = require('yargs').argv

module.exports  = function(api) {
    api.cache(true);

    const isTest = yargs['$0'].includes('jest')

    return {
        plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-proposal-class-properties"
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