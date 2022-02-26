const { on } = require('events')
const fs = require('fs')
const words = require('./functions/Dictonary/enable.js')

// const words = ["hotshot"]
dictionaryData = [...words]
resultArr = words
let data = []

const searchWord = (wordToSearch) => {
  var blankTileCount = wordToSearch.split('').filter((i) => i === '?').length
  wordToSearch = wordToSearch.replace(/ /g, '?')
  dictionaryData.map((word, index) => {

    var missedCounter = 0;
    var matchedCounter = 0;

    dicWord = word.split('')
    for (let i = 0; i < dicWord.length; i++) {
      if (wordToSearch.includes(dicWord[i])) {
        matchedCounter++;

        let newSet = wordToSearch.split("")
        newSet = [...new Set(newSet)]

        if (newSet.length + blankTileCount - 1 === wordToSearch.split("").length) {
          let re = new RegExp(`${dicWord[i]}`, 'g');
          let ds = word.replace(re, '$')
          word = ds
          dicWord = word.split('')
        }
      }
      else {
        missedCounter++;
      }
    }
    if (matchedCounter != 0) {
      if (missedCounter <= blankTileCount) {
        data.push(resultArr[index])
      }
    }
  })


  data = [...new Set(data)]

  for (let i = wordToSearch.length; i > 1; i--) {
    let newdata = data.filter((item) => item.length === i)
    console.log(i + " " + "Letter Words", newdata)
  }
}
searchWord('cool?')













// const searchWord = (word, tiles) => {
//   let wordValue = word.split('')
//   dictionaryData.map((i, index) => {
//     let blankTiles = tiles
//     let check = true
//     for (let k = 0; k < wordValue.length; k++) {
//       if (blankTiles >= 0) {
//         // console.log(blankTiles + wordValue[k])
//         // console.log
//         if (i.includes(wordValue[k])) {
//           check = true
//           // dictionaryData[index] = i.split('')
//           // let findIndex = i.indexOf(wordValue[k])
//           // dictionaryData[index][findIndex] = '$'
//           // dictionaryData[index] = dictionaryData[index].join('')
//           // i = dictionaryData[index]
//         } else {
//           check = true
//           if (blankTiles < 0) {
//             check = false
//             break
//           }
//           blankTiles = blankTiles - 1
//         }
//       }
//     }
//     if (check === true) {
//       data.push(resultArr[index])
//     }
//   })
//   // console.log(data)
//   for (let i = wordValue.length + 1; i > 1; i--) {
//     let newdata = data.filter((item) => item.length === i)
//     console.log(i + " " + "Letter Words", newdata)
//   }

// }
// searchWord('ram', 1)










