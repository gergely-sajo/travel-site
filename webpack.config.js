// require in the path module of Node.js
const path = require('path');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    entry: './app/assets/scripts/App.js', 
    // define the output of the bundled and minified file, such as name and directory
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    // needed to add the mode so we dont get a warning in the terminal
    mode: 'development',
    // watchin continuously what we do so no need to refresh the browser
    watch: true,
    // we have to add the module to tell webpack what to do with files if it encounters them
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
            }
        ]
    }
}