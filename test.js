const fs = require('fs')
// const enable = require('./functions/Dictonary/enable.js')

let enable = [
  'car',
  'acerb',
  'nisha',
  'manpreet',
  'raju',
  'streed',
  'kala',
  'ravi',
]

let matches = enable.filter((state) => {
  let searchVal = 'car'
  const regeX = new RegExp(`^${searchVal}`, 'gi')
  return state.match(regeX)
})
console.log(matches)
