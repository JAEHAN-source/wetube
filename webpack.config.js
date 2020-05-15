const path = require("path");
const ExtractCss = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");


const config = {
    entry: ENTRY_FILE,
    mode: MODE.replace(/\s/g, ""),
    module: {
        rules: [

            {
                test: /\/(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]

            },
            {
                test: /\.(scss)$/,
                use: ExtractCss.extract([
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer({ browsers: "cover 99.5%" })];
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }

                ])
            }

        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"

    },
    plugins: [new ExtractCss("styles.css")]

};

module.exports = config;