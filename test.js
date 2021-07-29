const fs = require('fs')
const axios = require('axios')
const nodegit = require('nodegit')
const path = require('path')
fs.rmdirSync('./_data/wordpointtables', { recursive: true })
const url = 'https://github.com/ManpreetChoudhary/word-point-data',
  local = './_data/wordpointtables',
  cloneOpts = {}
nodegit
  .Clone(url, local, cloneOpts)
  .then(function (repo) {
    console.log('Cloned ' + path.basename(url) + ' to ' + repo.workdir())
    fs.rmdirSync('./_data/wordpointtables.git', { recursive: true })
  })
  .catch(function (err) {
    console.log(err)
  })
