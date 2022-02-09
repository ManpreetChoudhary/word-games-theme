console.log("certain position");

let form = document.querySelector('[name=verify')
let txtBox = document.querySelectorAll('.txtBox')

let spinner = document.querySelector('.spinner')
const wordsStartingWith = async (value) => {
  try {
  
    let response = await fetch('http://127.0.0.1:9000/wordsStartingWith', {
      method: 'POST',
      body: JSON.stringify({
        value: "r",
      }),
    })
    let  data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}



function handleSubmit(e) {
  e.preventDefault()
  wordsStartingWith(txtBox.value)
}
form.addEventListener('submit', handleSubmit)

// Scrabble Point Array
const ScrabbleScore = () => {
  let twl06_sowpods = {
    a: 1,
    e: 1,
    i: 1,
    o: 1,
    u: 1,
    l: 1,
    n: 1,
    r: 1,
    s: 1,
    t: 1,
    d: 2,
    g: 2,
    b: 3,
    c: 3,
    m: 3,
    p: 3,
    f: 4,
    h: 4,
    v: 4,
    w: 4,
    y: 4,
    k: 5,
    j: 8,
    x: 8,
    q: 10,
    z: 10,
  }
  return twl06_sowpods
}
