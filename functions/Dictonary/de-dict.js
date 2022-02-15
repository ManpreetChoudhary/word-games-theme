module.exports = (entry) => { //Take an entry of letters.

    if (entry === undefined) {
        return `Your input is undefined.`
    }

    if (typeof entry !== 'string') {
        return `Your input is not a string.`
    }


//Create a const of all german words. 



module.exports = {"gW":germanWords};
    let wordArray = []; //Initialize an empty word array.

    for (i = 0; i < germanWords.length; i++) { //Iterate over each of the words in the german dictionary.

        let tempEntry = entry; //Dupicate the entry of letters to test (and then reset again) against each word in the german dictionary.
        let germanWordLetters = germanWords[i].split(''); //Split said Engilsh word into an array of its individual letters.

        let letterArray = []; //Initialize a letter array to which letters in said german word that match letters in entry can be pushed.

        for (j = 0; j < germanWordLetters.length; j++) { //Iterate over each of the letters in said German word.

                if (tempEntry.includes(germanWordLetters[j])) {
                    letterArray.push(germanWordLetters[j]); //If entered letters include said letter in german word, push said letter to the letter Array.

                    tempEntry = tempEntry.replace(germanWordLetters[j],'&').split('&').join(''); //Within the span of testing each word, update the entry temporarily by omitting the tested letter so that words with more than one instance of a matching letter do not test positive if there are not more than one instance of the letter in the entry. JavaScripts array library is relativeyl sparse, so the way to do this was to replace the first instance of said letter with a random character (an '&' in this case), the split at the random character, join the array back together and set equal again to a the temporary instance of the entry.

                }
        }
            if (letterArray.join('') === germanWords[i]) { //If the constructed letter array joined equals said german word, push that word to the word array
                //console.log(letterArray);
                wordArray.push(germanWords[i]);
            }
    }

    if (wordArray.length > 0) {
        return(wordArray);
        } else {
    return `No combination of these letters creates a word in the German language.`;
    }
};