/**
 * @fileoverview webpack 通用配置
 * @author lx
 * @date 2019/07
 */
let commonConfig = {
	// 根目录
	publicPath: '/',	// CDN地址
	// publicPath: '/',
	// 开发环境引用文件路径(根目录)
	devPublicPath : '/',
	// 开发目录
	devPath: './src/',
	// 开发端口
	devPort: 8081,
	// 发布引用文件路径(根目录)
	buildPublicPath : '<?= $C->CDN_URL ?>',
	// buildPublicPath : '',
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
	path: 'orderInfo_Inspection/',
	// 开发环境指定生成的名字
	devFilename: 'index.html',
	// 开发环境指定的静态文件
	devTemplate: 'component/orderInfo_Inspection/view/default/orderInfo.html',
	// 生产环境指定生成的名字
	buildFilename: 'html/mobile_iphone/orderform_pe_detail.php',
	// 生产环境指定的静态文件
	buildTemplate: 'component/orderInfo/orderInfo_build.html',
};

/**
 * 多页面数组
 * */
commonConfig.multiPage = [
	// {
	// 	title: "订单详情",
	// 	name: "orderInfo_default",
	// 	path: 'orderInfo_Inspection/view/default/index.js',
	// 	chunks	: ['manifest', 'orderInfo_default'],
	// 	isRelative		: true,
	// 	dev : {
	// 		// 开发环境指定生成的名字
	// 		filename: 'index.html',
	// 		// 开发环境指定的静态文件
	// 		template: commonConfig.devPath + 'component/orderInfo_Inspection/view/default/orderInfo.html',
	// 	},
	// 	build : {
	// 		// 生产环境指定生成的名字
	// 		filename: commonConfig.relativePath + 'html/mobile_iphone/orderform_pe_detail.php',
	// 		// 生产环境指定的静态文件
	// 		template: commonConfig.devPath + 'component/orderInfo_Inspection/view/default/orderInfo_build.html',
	// 	}
	// },
	{
		title: "订单详情_检查检验",
		name: "orderInfo_inspect",
		path: 'orderInfo_Inspection/view/inspect/index.js',
		chunks	: ['manifest', 'orderInfo_inspect'],
		isRelative		: true,
		dev : {
			// 开发环境指定生成的名字
			filename: 'orderInfo_inspect.html',
			// 开发环境指定的静态文件
			template: commonConfig.devPath + 'component/orderInfo_Inspection/view/inspect/orderInfo_Inspection.html',
		},
		build : {
			// 生产环境指定生成的名字
			filename: commonConfig.relativePath + 'html/mobile_iphone/orderform_child_care_detail.php',
			// 生产环境指定的静态文件
			template: commonConfig.devPath + 'component/orderInfo_Inspection/view/inspect/orderInfo_Inspection_build.html',
		}
	},
];

// 入口
commonConfig.entry = {

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
	// fonts file size <= 5KB, use 'base64'; else, output svg file
	fontMaxSize: 30 * 1024,
};
// HTML
commonConfig.html = {
	dev : {
		title : '111',
		filename: 'index.html',
		template: commonConfig.devPath + projectConfig.devTemplate,
		// inject:'head',
		hash:true,
	},
	build : {
		title : '111',
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

// url指向静态文件地址
commonConfig.openBuild = {
	Port: 8082,
	Path: './dist/',
	Url	: '/' + commonConfig.relativePath + projectConfig.buildFilename,
},

// 打印多个页面访问地址
commonConfig.openBuild1 = {
	Port: 8082,
	Path: './dist/',
	Url	: '/' + commonConfig.relativePath + projectConfig.buildFilename,
},

// 清理指定发布目录
// commonConfig.distPath = '/dist/';

module.exports = commonConfig;
