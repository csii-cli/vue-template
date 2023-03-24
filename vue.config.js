// 拼接路径
const resolve = (dir) => require("path").join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const WebpackBar = require("webpackbar");
// 增加环境变量
process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_BUILD_TIME = require("dayjs")().format("YYYY-M-D HH:mm:ss");
// chunk文件后缀 防缓存
const Version = `1.0.${new Date().getTime()}`;
// 本地运行文件路劲 和 打包文件路劲
const publicPath = process.env.NODE_ENV === "development" ? "/" : "./";
module.exports = {
  // 根据你的实际情况更改这里
  publicPath: publicPath,
  outputDir: "per",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    open: true,
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true,
    },
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        // target: 'https://www.imjohn.cn:9000', // 腾讯云node接口
        target: "http://127.0.0.1:80", //
        // target: 'https://www.imjohn.cn', // 腾讯云
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/' // 需要rewrite重写的,
        // }
      },
    },
    publicPath,
  },
  css: {
    // extract: IS_PROD,
    // requireModuleExtension: false, // 去掉文件名中的 .module
    // loaderOptions: {
    //   // 给 less-loader 传递 Less.js 相关选项
    //   less: {
    //     // `globalVars` 定义全局对象，可加入全局变量
    //     globalVars: {
    //       primary: '#333'
    //     }
    //   }
    // }
  },
  configureWebpack: (config) => {
    // 非开发环境
    if (process.env.NODE_ENV !== "development") {
      // config.optimization.minimizer[0].options.sourceMap = sourceMap
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs =
        ["console.log"];
      // 依赖分包js
      config.optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              },
            },
          },
        },
      };
    }
    config.module.rules = [...config.module.rules];
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: (config) => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete("prefetch").delete("preload");
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config
      .plugin("WebpackBar")
      .use(WebpackBar)
      .tap(() => {
        return [
          {
            color: "#ccc",
            name: "ccccc",
          },
        ];
      });

    config.module
      .rule("less") // less文件转css
      .test(/\.less$/)
      .oneOf("vue")
      .resourceQuery(/\?vue/)
      .use("px2rem")
      .loader("px2rem-loader") // px转rem
      .before("postcss-loader") // 处理css兼容
      .options({
        remUnit: 100,
        minPixelValue: 2,
        propWhiteList: [],
      });
    config.resolve.symlinks(true); // 修复热更新失效
    config
      // 开发环境
      .when(
        process.env.NODE_ENV === "development",
        // sourcemap不包含列信息
        (config) => config.devtool("cheap-source-map")
      );
    // image exclude
    const imagesRule = config.module.rule("images");
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg|ico)(\?.*)?$/)
      .exclude.add(resolve("src/assets/svg-icons/icons"))
      .end();
    imagesRule
      .use("url-loader")
      .loader("url-loader")
      .tap((options) =>
        Object.assign(options, { limit: 10240, esModule: false })
      );
    // 设置别名
    config.resolve.alias
      .set("@api", resolve("src/api"))
      .set("@views", resolve("src/views"))
      .set("public", resolve("public"))
      .set("@", resolve("src"));
    // 判断环境加入模拟数据
    const entry = config.entry("app");
    if (process.env.VUE_APP_BUILD_MODE !== "NOMOCK") {
      entry.add("@/mock").end();
    }
    config.output
      .filename(`js/[name].js?version=${Version}`)
      .chunkFilename(`js/[name]_chunk.js?version=${Version}`)
      .end();
  },
};
