// Webpack V4
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const SvgStorePlugin = require('webpack-svg-icon-system/lib/SvgStorePlugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = (env, argv) => {
    /**
     * Production environment conditional.
     */
    const PROD = argv.mode === 'production';
    /**
     * SCSS Filename.
     */
    const SCSS_FILE = {filename: PROD ? 'css/style.min.css' : 'css/style.css'};
    /**
     * Webpack Plugins
     */
    const PLUGINS = PROD ? [
        /**
         *  Production Plugins
         */
        new MiniCssExtractPlugin(SCSS_FILE),
        new SvgStorePlugin(),
        new TerserPlugin()
    ] : [
        /*
         * Development Plugins
         */
        new MiniCssExtractPlugin(SCSS_FILE),
        new SvgStorePlugin(),
        new LiveReloadPlugin()
    ]
    /**
     * PostCSS Plugins
     */
    const POSTCSS_PLUGINS = PROD ? [
        /**
         * Production Post CSS Plugins
         */
        require('autoprefixer'),
        require('cssnano')
    ] : [
        /**
         * Development Post CSS Plugins
         */
        require('autoprefixer'),
    ];
    /**
     * Webpack Configuration
     */
    return {
        entry: {
            main: './webpack.build.js'
        },
        output: {
            path: path.resolve(__dirname, 'assets'),
            filename: PROD ? 'js/main.min.js' : 'js/main.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: POSTCSS_PLUGINS
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'webpack-svg-icon-system',
                            options: {
                                name: 'img/icons.svg',
                                prefix: 'icon'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: PLUGINS
    }
};
