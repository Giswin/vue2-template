const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const Timestamp = new Date().getTime();

module.exports = {
  publicPath: "./",
  productionSourceMap: false, // false : 不生成map文件
  // 编译入口配置，如果不配置，默认就是src
  /* pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    }, */
  devServer: {
    //port: 7001, //侦听端口
    proxy: {
      "/cbm/": {
        //请求中如果以/ifs为前缀则进行转发
        //target: 'http://localhost:9090/GTHS-IFS-S', //跨域转发的实际地址
        target: "http://192.168.0.11:90/GTHS-CBM-S",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/cbm": "", //将原请求中的/cbs去掉
        },
      },

      "/ifs/": {
        //请求中如果以/ifs为前缀则进行转发
        // target: "http://192.168.0.186:88/GTHS-IFS-S",
        target: "http://192.168.0.11:90/GTHS-IFS-S",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/ifs": "", //将原请求中的/ifs去掉
        },
      },
      "/bms/": {
        //请求中如果以/bms为前缀则进行转发
        target: "http://192.168.0.11:90/GTHS-BMS-S",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/bms": "", //将原请求中的/ifs去掉
        },
      },
      "/gbs/": {
        //请求中如果以/gbs为前缀则进行转发
        //target: 'http://localhost:9090/GTHS-GBS-S', //跨域转发的实际地址
        // target: "http://192.168.0.186:88/gths-gbs",
        target: "http://192.168.0.120:80/gths-gbs",

        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/gbs": "", //将原请求中的/ifs去掉
        },
      },
      // 上传文件的又拍云地址
      "/upload/": {
        target: "https://v0.api.upyun.com", //跨域转发的实际地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/upload": "", //将原请求中的/upload去掉
        },
      },
      "/import/": {
        target: "http://api.syxmgd.com:55051/open-server/", //跨域转发的实际地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/import": "",
        },
      },
    },
  },
  outputDir: process.env.outputDir, // 打包生成目录
  // 第三方插件配置
  pluginOptions: {
    "process.env": {
      NODE_ENV: "development",
    },
  },
  // 编译打包配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 生产环境
      config.plugins.push(
        new CompressionWebpackPlugin({
          asset: "[path].gz[query]", // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }

    // 给编译打包的js文件加上时间戳后缀，为了解决缓存的问题，同时要给public/index.html里 添加
    /* 
        <meta   http-equiv="Expires"   CONTENT="0">
        <meta   http-equiv="Cache-Control"   CONTENT="no-cache">
        <meta   http-equiv="Pragma"   CONTENT="no-cache"> 
        */
    config.output.filename = `static/js/[name].${Timestamp}.js`;
    config.output.chunkFilename = `static/js/[name].${Timestamp}.js`;
  },
  // 扩展 webpack 配置
  chainWebpack: (config) => {
    /**
     * 配置打包时使用CDN节点,左面放package.json中的扩展的名称,右面放项目依赖的名称(项目初始化要用的名称)
     * externals外部扩展的意思，使用外部CDN节点进行打包
     * 3、名称带中横线的需使用引号包起来
     *  */
    /* config.set("externals", {
            vue: 'Vue',
        }) */
  },
  css: {
    loaderOptions: {
      // 引入全局的css样式定义文件
      sass: {
        prependData: `@import "@/assets/scss/variable.scss";`,
      },
    },
    extract: {
      //一种方式，打包后的css 会带版本号，不改变文件名的。
      /* filename: 'css/[name].css?v=' + Timestamp,
            chunkFilename:'css/[name].css?v=' + Timestamp */
      //一种方式，每次打包后的css文件名会变更新。
      filename: "css/[name]." + Timestamp + ".css",
      chunkFilename: "css/[name]." + Timestamp + ".css",
    },
  },
};
