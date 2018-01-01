const path = require('path');

module.exports = {
  alias: {
    _js: path.resolve(__dirname, 'src/js'),
    _components: path.resolve(__dirname, 'src/js/components'),
    _constants: path.resolve(__dirname, 'src/js/constants'),
    _sass: path.resolve(__dirname, 'src/sass'),
    _img: path.resolve(__dirname, 'src/images')
  }
};
