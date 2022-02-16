const fs = require('fs')
const words = require('./functions/Dictonary/enable.js')

// let words = ["ram", "python", "door", "pyhon", "aa", "aah", "aahed", "aahing", "aahs", "aal", "aalii", "aaliis", "aals", "aardvark", "aardvarks", "aardwolf", "aardwolves", "aargh", "aarrgh", "aarrghh", "aarti", "aartis", "aas", "aasvogel", "aasvogels", "ab", "aba", "abac", "abaca", "abacas", "abaci", "aback", "abacs", "abacterial", "abactinal", "abactinally", "abactor", "abactors", "abacus", "abacuses", "abaft", "abaka", "abakas", "abalone", "abalones", "abamp", "abampere", "abamperes", "abamps", "aband", "abanded", "abanding", "abandon", "abandoned", "abandonedly", "abandonee", "abandonees", "abandoner", "abandoners", "abandoning", "abandonment", "abandonments", "abandons", "abandonware", "abandonwares", "abands", "abapical", "abas", "abase", "abased", "abasedly", "abasement", "abasements", "abaser", "abasers", "abases", "abash", "abashed", "abashedly", "abashes", "abashing", "abashless", "abashment", "abashments", "abasia", "abasias", "abasing", "abask", "abatable", "abate", "abated", "abatement", "abatements", "abater", "abaters", "abates", "abating", "abatis", "abatises", "abator", "abators", "abattis"]
dictionaryData = [...words]
resultArr = words
const searchWord = (word) => {
  let wordValue = word.split('')
  let data = []
  dictionaryData.map((item, index) => {
    let check = true
    for (let e = 0; e < wordValue.length; e++) {
      if (item.includes(wordValue[e])) {
        check = true
        dictionaryData[index] = item.split('')
        let findIndex = item.indexOf(wordValue[e])
        dictionaryData[index][findIndex] = '$'
        dictionaryData[index] = dictionaryData[index].join('')
        item = dictionaryData[index]
      }
      else {
        check = false
        break
      }
      if (check === true) {
        data.push((resultArr[index]))
      }
    }
  })

  data = [...new Set(data)]

  for (let i = wordValue.length; i > 1; i--) {
    let newdata = data.filter((item) => item.length === i)
    if (i == 5) {
    }
    console.log(i + " " + "Letter Words", newdata)
  }
}
searchWord("ram??")





