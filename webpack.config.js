const yargs = require('yargs').argv
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const bodyParser = require('body-parser')

const appsPath = path.resolve('./app')
const viewsPath = path.resolve(`${appsPath}/views`)
const appName = yargs.app

if (appName && !fs.existsSync(`${viewsPath}/${appName}`)) {
	throw new Error(`No such app as ${appName}`)
}

const mode = process.env.NODE_ENV = yargs.mode || 'development'
const hot = yargs['$0'].includes('webpack-dev-server')

if (hot && !appName) {
	throw new Error('App name should be provided with hot reload feature using --app argument like: --app=testApp')
}

const entry = appName && `${viewsPath}/${appName}/src/index.js` ||
	Object.assign(
		{},
		...glob.sync('@(*|!chunks)', { cwd: viewsPath })
			.map(app => (fs.existsSync(`${viewsPath}/${app}/src/index.js`) && { [app]: `${viewsPath}/${app}/src/index.js` }))
	)

const boundleFile = 'boundle.js'
const output = {
	path: viewsPath,
	filename: `${appName || '[name]'}/dist/${boundleFile}`,
	publicPath: '/',
	chunkFilename: 'chunks/[id].[chunkhash].js'
}

const HtmlWebpackPluginOptionsFactor = app => Object.assign(
	{
		inject: false,
		template: `pug-loader!${appsPath}/template.pug`,
		resetCss: fs.readFileSync(path.resolve(__dirname, 'node_modules/reset-css/reset.css')),
		hot,
		app: `${app}/dist/${boundleFile}`
	},
	hot || mode != 'production' ? {
		inject: true
	} : {
		filename: `${viewsPath}/${app}/dist/index.html`
	}
)

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["chunks/*"] }),
	new webpack.ProvidePlugin({
		React: 'react'
	}),
	new CircularDependencyPlugin({
		exclude: /node_modules/,
		failOnError: true,
		cwd: process.cwd()
	}),
	...(typeof entry === 'string' ? [appName] : Object.keys(entry))
		.map(app => new HtmlWebpackPlugin(HtmlWebpackPluginOptionsFactor(app)))
]

const optimization = mode !== 'production' ? {} : {
	minimizer: [
		new TerserPlugin({
			cache: true,
			parallel: true
		})
	]
}

module.exports = {
	mode,
	entry,
	output,
	plugins,
	optimization,
	externals: hot ? {} : {
		'React': 'React'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		alias: {
			ui: path.resolve(`${appsPath}/ui/index.js`),
			theme: path.resolve(`${appsPath}/ui/themes/main/index.js`),
			utils: path.resolve(`${appsPath}/utils.js`)
		}
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		overlay: true,
		disableHostCheck: true,
		historyApiFallback: true,
		before(app) {
			const mock = fs.existsSync(`${viewsPath}/${appName}/mock.js`) && require(`${viewsPath}/${appName}/mock.js`)

			mock && Object.entries(mock).map(
				([method, paths]) => Object.entries(paths).map(
					([path, mock]) => app[method](path, bodyParser.json(), (req, res) => setTimeout(() => res.json(mock(req)), 1000))
				)
			)
		}
	}
}