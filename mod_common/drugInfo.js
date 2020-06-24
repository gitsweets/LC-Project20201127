/**
 * @fileoverview webpack 通用配置
 * @author lx
 * @date 2019/07
 */
let commonConfig = {
	// 根目录
	publicPath: '/',
	// 开发目录
	devPath: './src/',
	// 开发端口
	devPort: 8081,
	// 发布目录
	buildPath: '../dist/',
	// 相对路径
	relativePath: 'themes/simplicity/',
};
/**
 * 项目独立配置
 * */
let projectConfig = {
	// 项目指向路径和生成增加路径
	path: 'drugInfo/',
	// 开发环境指定生成的名字
	devFilename: 'index.html',
	// 开发环境指定的静态文件
	devTemplate: 'component/drugInfo/drugInfo.html',
	// 生产环境指定生成的名字
	buildFilename: 'html/mobile_iphone/otc_detail_pe.php',
	// 开发环境指定的静态文件
	buildTemplate: 'component/drugInfo/drugInfo_build.html',
};

// 公共类库和全局
const vendor = ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
	component = commonConfig.devPath + 'page/index.js';

// 入口
commonConfig.entry = {
	// 公共类库
	// vendor: commonConfig.devPath + 'js/customs/main.js',
	// vendor: commonConfig.devPath + 'js/vendors/jquery/jquery-1.10.2.min.js',
	// 组件
	// plug: commonConfig.devPath + 'modules/examine/vendor.js',
	// 业务
	page: commonConfig.devPath + 'component/' + projectConfig.path + 'index.js'
};

// CSS
commonConfig.css = {
	dev: {
		filename: 'css/' + projectConfig.path + '[name].[contenthash:8].css',
		allChunks: true
	},
	build: {
		filename: commonConfig.relativePath + 'css/' + projectConfig.path + '[name].[contenthash:8].css',
		allChunks: true
	}
};
// JS
commonConfig.js = {
	devPath: 'js/' + projectConfig.path + '[name].[chunkhash:8].js',
	buildPath: commonConfig.relativePath + 'js/' + projectConfig.path + '[name].[chunkhash:8].js'
};
// IMAGES
commonConfig.images = {
	// 图片相对路径
	imgPath: commonConfig.relativePath + 'images/' + projectConfig.path,
	// 图片转 base64 最大文件大小，<30k 的图片转 base64
	imgMaxSize: 30 * 1024,
};
// FONTS
commonConfig.fonts = {
	// 图片相对路径
	fontPath: commonConfig.relativePath + 'css/' + projectConfig.path,
	// 图片转 base64 最大文件大小，<30k 的图片转 base64
	imgMaxSize: 15000,
};
// HTML
commonConfig.html = {
	dev : {
		filename: 'index.html',
		template: commonConfig.devPath + projectConfig.devTemplate,
		// inject:'head',
		// hash:true,
	},
	build : {
		// PHP打包写法
		filename: commonConfig.relativePath + projectConfig.buildFilename,
		template: commonConfig.devPath + projectConfig.buildTemplate,
		// 默认写法
		// filename: commonConfig.relativePath + 'html/mobile_iphone/lancarecustomhouseinterfaceTianjin.html',
		// template: commonConfig.devPath + 'page/lancarecustomhouseinterfaceTianjin.html',
		// inject:'head',
		// hash:true,
	},
};

// 本地开发调试工具
commonConfig.devServer = {
	// 指向打开目录
	// contentBase: path.join(__dirname, 'dist'),
	contentBase: './src/',
	// 开发端口
	// port: commonConfig.devPort,	//
	port: 8091,
	// 访问地址
	// host:'0.0.0.0',
	host:'localhost',
	// 是否打开浏览器
	open: true,
	// 热替换特性
	// hot: true
},

// 第三方库、cdn
commonConfig.cdn = {
	dev : {
		isWork : true,
		options: {
			// axios: '//cdn.bootcss.com/axios/0.18.0/axios.min.js',
			jquery: '//img.lancare.cc/themes/simplicity/js/jquery-1.10.2.min.js'
		}
	},
	build : {
		isWork : true,
		options: {
			// axios: '//cdn.bootcss.com/axios/0.18.0/axios.min.js',
			// jquery: '/themes/simplicity/js/jquery-1.10.2.min.js',
			jquery: '//img.lancare.cc/themes/simplicity/js/jquery-1.10.2.min.js'
		}
	}
},

// 压缩配置
commonConfig.min = {
	dev : {
		isWork : true,
		options: {
			// axios: '//cdn.bootcss.com/axios/0.18.0/axios.min.js',
			// jquery: '//www.lk.cn/themes/simplicity/js/jquery-1.10.2.min.js'
		}
	},
	build : {
		//压缩选项
		uglifyOptions: {
			ie8: true,
			output: {
				comments: false,
				beautify: false
			},
			warnings: false,
			compress: {
				warnings: false,
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log'] // 移除console
			}
		},
		sourceMap: false,
		// 开启多线程
		parallel: true
	}
},

// 分离公共类库
commonConfig.vendor	= {
	// name: 'vender', // 公共代码的chunk命名为 'verder' // 上面入口定义的节点组
	name: ['vendor', 'manifest'],
	minChunks: Infinity,
	// filename: '[name].bundle.js' // 生成的文件名为 vender.bundle.js	//最后生成的文件名
},

// 清理指定发布目录
// commonConfig.distPath = '/dist/';

module.exports = commonConfig;
