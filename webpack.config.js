var path = require('path');

module.exports = {
   entry: {
     ddj:'./src/ddj.js'
    },
   output: {
     filename: "[name].js",
     path: path.resolve(__dirname, 'webroot/')
   },
   plugins: [
]
};