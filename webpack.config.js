var path = require('path');

module.exports = {
   entry: {
     ddj:'./ddj.js'
    },
   output: {
     filename: "[name].js",
     path: path.resolve(__dirname, 'build/')
   },
   plugins: [
]
};