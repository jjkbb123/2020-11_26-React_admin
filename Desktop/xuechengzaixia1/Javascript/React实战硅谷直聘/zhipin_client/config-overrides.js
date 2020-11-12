// const {injectBabelPlugin, override, addWebpackAlias,fixBabelImports} = require('customize-cra');
// const path = require('path')

// module.exports = function override(config, env) {
//   // babel-plugin-import
//   config = injectBabelPlugin(['import', {
//   libraryName: 'antd-mobile',
//   //style: 'css',
//   style: true, // use less for customized theme
//   }], config);
// }

//  module.exports = override(
//    addWebpackAlias({
//      assets: path.resolve(__dirname, './src/assets'),
//      components: path.resolve(__dirname, './src/components'),
//      pages: path.resolve(__dirname, './src/pages'),
//      common: path.resolve(__dirname, './src/common')
//    })
// );


//  module.exports = override(
//    fixBabelImports('import', {
//      libraryName: 'antd-mobile',
//      style: true,
//    }),
// );

const {injectBabelPlugin} = require('react-app-rewired');
 
module.exports = function override(config, env){
    config = injectBabelPlugin([
        'import', {libraryName: 'antd-mobile', libraryDirectory: 'es', style: 'css'}
    ], config);
    return config
}// 以React按需加载antd-design为例<br>// 这样即可在其他JS直接import { Button } from 'antd'