//npm install style-loader css-loader url-loader raw-loader
module.exports = {
	devtool: 'eval-source-map', //用于调试代码
	entry: __dirname + "/app.js", //入口文件
	output: {
		path: __dirname + "/public", //打包后的文件存放的地方
		filename: "bundle.js" //打包后输出文件的文件名
	},
	module: {
		loaders: [{
			test: /\.html$/,
			loader: 'raw-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}]
	}
}