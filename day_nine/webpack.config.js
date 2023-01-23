const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
 
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    module: {
        rules: [
          // ... other rules
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.css$/,
            oneOf: [
                // this matches `<style module>`
                {
                    resourceQuery: /module/,
                    use: [
                        'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                },
                // this matches plain `<style>` or `<style scoped>`
                {
                    use: ['vue-style-loader', 'css-loader']
                }
            ]
        }
        ]
      },
   resolve: {
       alias: {
           vue: 'vue/dist/vue.esm-bundler'
       }
   },
 devServer: {
   static: path.join(__dirname, 'src'),
   compress: true,
   port: 8080
 },
 plugins: [
   new webpack.DefinePlugin({
     __VUE_OPTIONS_API__: true,
     __VUE_PROD_DEVTOOLS__: false
   }),
   new VueLoaderPlugin()
 ]
};