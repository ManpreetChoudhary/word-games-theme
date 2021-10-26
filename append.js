const fs = require('fs')
const fileRead = fs.readFileSync(`./_data/wordgames/en/eight_letter_word_finder.json`, {
    encoding: 'utf8',
    flag: 'r',
})
const data = {
    "word": "value"
}
console.log(fileRead);
fs.appendFileSync('./_data/wordgames/en/eight_letter_word_finder.json', JSON.stringify(data))