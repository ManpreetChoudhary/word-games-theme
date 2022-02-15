const fs = require('fs')

const words = require('./functions/Dictonary/enable.js')
// let words = ["ram", "python", "door", "pyhon", "aa", "aah", "aahed", "aahing", "aahs", "aal", "aalii", "aaliis", "aals", "aardvark", "aardvarks", "aardwolf", "aardwolves", "aargh", "aarrgh", "aarrghh", "aarti", "aartis", "aas", "aasvogel", "aasvogels", "ab", "aba", "abac", "abaca", "abacas", "abaci", "aback", "abacs", "abacterial", "abactinal", "abactinally", "abactor", "abactors", "abacus", "abacuses", "abaft", "abaka", "abakas", "abalone", "abalones", "abamp", "abampere", "abamperes", "abamps", "aband", "abanded", "abanding", "abandon", "abandoned", "abandonedly", "abandonee", "abandonees", "abandoner", "abandoners", "abandoning", "abandonment", "abandonments", "abandons", "abandonware", "abandonwares", "abands", "abapical", "abas", "abase", "abased", "abasedly", "abasement", "abasements", "abaser", "abasers", "abases", "abash", "abashed", "abashedly", "abashes", "abashing", "abashless", "abashment", "abashments", "abasia", "abasias", "abasing", "abask", "abatable", "abate", "abated", "abatement", "abatements", "abater", "abaters", "abates", "abating", "abatis", "abatises", "abator", "abators", "abattis"]
dictionaryData = [...words]
resultArr = words
const searchWord = (word) => {
  let wordValue = word.split('')

  // pyon?a?b?c?d?e?f?g?h?f?g
  let data = []
  dictionaryData.map((item, index) => {
    let check = true
    for (let e = 0; e < wordValue.length; e++) {
      if (item.includes(wordValue[e])) {
        check = true
      }
      else {
        check = false
        break
      }
      if (check === true) {
        data.push(item)
      }
    }
  })
  let items = data.filter((t) => t.length === 5)
  console.log(items)

  items.map((item) => {
    let check = true
    let wordValue = "arr"
    for (let e = 0; e < wordValue.length; e++) {
      if (item.includes(wordValue[e])) {
        check = true
        console.log(item)
      }
      else {
        check = false
        break
      }
      if (check === true) {
        data.push(item)
      }
    }
  })


}

searchWord("yon")