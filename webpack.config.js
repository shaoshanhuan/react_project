const path = require("path");

module.exports = {
    mode : "development",
    entry : "./app/main.js",
    output : {
        filename : "bundle.js",
        publicPath : "xuni",
        path : path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react'],
                        plugins : [
                            'transform-object-rest-spread',
                                [
                                    'import',{
                                    "libraryName": "antd",
                                    "style": false
                                }
                            ],
                            'transform-runtime',
                            'transform-decorators-legacy'
                        ]
                    }
                },
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
			{
				test: /\.less$/,
				use: [
					  {
						loader: 'style-loader', // creates style nodes from JS strings
					  },
					  {
						loader: 'css-loader', // translates CSS into CommonJS
					  },
					  {
						loader: 'less-loader', // compiles Less to CSS
					  },
				],
			}
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.2.233',
                pathRewrite: {'^/api' : ''}
            }
        }
    },
	resolve: {
		// 省略扩展名
		extensions: [".js"]
	}
}