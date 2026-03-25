import path from 'path'
import webpack, { runtime } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

type Mode = 'development' | 'production'

interface IEnvVariables {
	mode: Mode
	port: number
}

export default (env: IEnvVariables) => {
	const config: webpack.Configuration = {
		mode: env.mode ?? 'development', // передаем конфиг со скрипта запуска dev / prod
		entry: path.resolve(__dirname, 'src', 'main.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name]. [contenthash:8].css',
				chunkFilename: 'css/[name]. [contenthash:8].css',
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
				favicon: path.resolve(__dirname, 'public', 'favicon.png'), // фавиконка статичная
			}),
		], // генерит динамически  новое название пути к скрипту в сбандленом html файле (хеш)
		module: {
			rules: [
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
					//для картинок
				},
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					use: [
						{
							loader: '@svgr/webpack',
							options: {
								icon: true,
								svgoConfig: {
									plugins: [
										{
											name: 'convertColors',
											params: { currentColor: true },
										},
									],
								},
							},
						},
					],
					// для свг , использование как реакт-компонент + props <Svg width={55} height={55} color={'red'} />
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// 'style-loader',
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									// url: true,
									localIdentName: '[path][name]__[local]--[hash:base64:5]',
								},
							},
						},

						'sass-loader',
					],
				},
				// {
				// 	test: /\.tsx?$/,
				// 	exclude: /node_modules/,
				// 	use: 'ts-loader',
				// }, // отключен, заменен на babel-loader
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
						},
					},
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		devtool: 'source-map', //можно добавить сурсмап для удобного дебага
		devServer: {
			port: env.port ?? 5002, //пример запуска серва npm run start -- --env port=3333 или порт 5002
			open: true,
			// hot: true,
			historyApiFallback: true, //(разрешает переходы по ссылкам) работате только для дев,  если раздавать статику на nginx то надо делать проксирование на индекс.нтмл
		},
	}
	return config
}
