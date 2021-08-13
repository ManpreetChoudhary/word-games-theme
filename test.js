const scrabble = require('scrabble')

let alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

let letter = 'pyon'
let spc = '?'
let scrmble
if (spc == '?') {
  alphabets.forEach((element) => {
    newElem = spc.replace(spc, element.toLocaleLowerCase())
    scrmble = scrabble(`${letter}${newElem}`)
    console.log(scrmble)
  })
}
