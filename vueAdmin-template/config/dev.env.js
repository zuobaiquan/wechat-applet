'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// var urlDebug = 'https://ifarm.iqiys.cn/test/api/';
// var urlRelease = 'https://ifarm.iqiys.cn/api/';
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://ifarm.iqiys.cn/test/"'
})
