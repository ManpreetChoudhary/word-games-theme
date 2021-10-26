 const fs = require('fs')
const scrabble = require('scrabble')
const filePaths = ["eight_letter_word_finder.json", "eleven_letter_word_finder.json"]
const files = []
const wordsData = []
filePaths.map(file => {
    const data = fs.readFileSync(`./_data/wordgames/en/${file}`, {
        encoding: 'utf8',
        flag: 'r',
    })
    const filesData = JSON.parse(data)
    filesData.filepath = file
    files.push(JSON.stringify(filesData))

})
files.map(item => {
    const data = JSON.parse(item)
    data.filewords.name = data.filepath
    wordsData.push(data.filewords)
})
const wordsResults = []
wordsData.map(i => {
    i.data.map(item => {
        const wordsResult = scrabble(item.word)
        wordsResults.push(wordsResult.filter((r) => r.length == item.word.length))
    })
})