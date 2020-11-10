const {injectBabelPlugin, override, addWebpackAlias,fixBabelImports} = require('customize-cra');
const path = require('path')

module.exports = function override(config, env) {
  // babel-plugin-import
  config = injectBabelPlugin(['import', {
  libraryName: 'antd-mobile',
  //style: 'css',
  style: true, // use less for customized theme
  }], config);
}

 module.exports = override(
   addWebpackAlias({
     assets: path.resolve(__dirname, './src/assets'),
     components: path.resolve(__dirname, './src/components'),
     pages: path.resolve(__dirname, './src/pages'),
     common: path.resolve(__dirname, './src/common')
   })
);


 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd-mobile',
     style: true,
   }),
);