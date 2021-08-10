const word = 'python'

const natural = require('natural')
const wordnet = new natural.WordNet()

wordnet.lookup(word, function (details) {
  console.log('Definition: ' + details[0].def)
  console.log('Synonyms: ' + details[0].synonyms)
})
