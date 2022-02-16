const natural = require('natural');


exports.handler = function (event, context,callback) {
    //Fetch Word
    request_data = event['queryStringParameters']
    let search = request_data['search']
  
    const wordnet = new natural.WordNet('./wordnet-db/dict');
    let defi = [], syn = [], ex = [], ty = [], k = 0;
    let noun="",verb="",adjective="",adverb="";
  
    wordnet.lookup(search, function (details) {
      details.forEach(function (detail) {
        ty[k] = detail.pos;
        defi[k] = detail.def;
        syn[k] = detail.synonyms;
        let l = 0, temp = [null];
        // Display examples, if available
        detail.exp.forEach(function (example) {
          temp[l] = example;
          l++;
        });
        let o ="{"+temp[0]+"}";
        for (let i = 1; i < temp.length; i++) {
          o += ", {" + temp[i]+"}";
        }
        ex[k] =  o;
        k++;
      });
    });
    
    const send = (noun,verb,adjective,adverb) => {
        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Request-With, Content-Type , Accept',
          },
          body: JSON.stringify(noun+"&"+verb+"&"+adjective+"&"+adverb)
        })
      }

    function structureData(word,type,mean,exam,syns) {
        for(let i=0;i<type.length||i<25;i++)
        {
            switch(type[i])
            {
                case 'n':{
                    noun+="<b>Meaning:</b> "+mean[i]+"<br>";
                    if(exam[i]!="{null}")
                        noun+="<b>Examples:</b> "+exam[i]+"<br>";
                    if(syns[i]!=word)
                        noun+="<b>Synonyms:</b> "+syns[i]+"<br>";
                    noun+=";"
                    break;
                }
                case 'v':{
                    verb+="<b>Meaning:</b> "+mean[i]+"<br>";
                    if(exam[i]!="{null}")
                        verb+="<b>Examples:</b> "+exam[i]+"<br>";
                    if(syns[i]!=word)
                        verb+="<b>Synonyms:</b> "+syns[i]+"<br>";
                    verb+=";"
                    break;
                }
                case 'a':{
                    adjective+="<b>Meaning:</b> "+mean[i]+"<br>";
                    if(exam[i]!="{null}")
                        adjective+="<b>Examples:</b> "+exam[i]+"<br>";
                    if(syns[i]!=word)
                        adjective+="<b>Synonyms:</b> "+syns[i]+"<br>";
                    adjective+=";"
                    break;
                }
                case 'r':{
                    adverb+="<b>Meaning:</b> "+mean[i]+"<br>";
                    if(exam[i]!="{null}")
                        adverb+="<b>Examples:</b> "+exam[i]+"<br>";
                    if(syns[i]!=word)
                        adverb+="<b>Synonyms:</b> "+syns[i]+"<br>";
                    adverb+=";"
                    break;
                }
            }
        }
        send(noun,verb,adjective,adverb);
    }
    
    let counter = 0;

    let check = setInterval(()=>{
        if (defi.length > 0){
            structureData(search,ty,defi,ex,syn);
            clearInterval(check);
        }
        else if(counter>38){
            callback(null, {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers':
                      'Origin, X-Request-With, Content-Type , Accept',
                },
                body: JSON.stringify({msg:"Error"})
              })
            clearInterval(check);
        }
        else
            counter++;
    },200)
  }
  