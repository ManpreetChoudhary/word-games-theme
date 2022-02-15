// getqueryUrl from form
const params = new URLSearchParams(window.location.search)
let serachValue = params.get('search')

let txtBox = document.querySelector('.txtBox')
txtBox.value = serachValue

// DICTONARY
const fetchMeaning = async (serachValue) => {
  try{
  let resMeaning = await fetch(`/.netlify/functions/wordMeaning?search=${serachValue}`)
  let getDef = await resMeaning.text()

  if (getDef && resMeaning.status == 200) {
    let removeQuote = getDef.replaceAll(`"`,``);
    let arr = removeQuote.split("&");
    let cols1 = null;
    let cols2 = null;
    let cols3 = null;
    let cols4 = null;
    if(arr[0].length>0)
      cols1 = arr[0].split(";");
    if(arr[1].length>0)
      cols2 = arr[1].split(";");
    if(arr[2].length>0)
      cols3 = arr[2].split(";");
    if(arr[3].length>0)
      cols4 = arr[3].split(";");
    if(cols1!=null)
    {
      let noun = document.getElementById("noun");
      let oList = document.createElement("ol");
      oList.setAttribute("class","list-group list-group-numbered");
      for(let i=0;i<cols1.length;i++)
      {
        if(cols1[i]=="")
          continue;
        let temp = document.createElement("li");
        temp.setAttribute("class","list-group-item my-2");
        temp.style.display="list-item";
        temp.innerHTML = cols1[i];
        oList.appendChild(temp);
      }
      noun.appendChild(oList);
      noun.style.display = "inherit";
    }
    if(cols2!=null)
    {
      let verb = document.getElementById("verb");
      let oList = document.createElement("ol");
      oList.setAttribute("class","list-group list-group-numbered");
      for(let i=0;i<cols2.length;i++)
      {
        if(cols2[i]=="")
          continue;
        let temp = document.createElement("li");
        temp.setAttribute("class","list-group-item my-2");
        temp.style.display="list-item";
        temp.innerHTML = cols2[i];
        oList.appendChild(temp);
      }
      verb.appendChild(oList);
      verb.style.display = "inherit";
    }
    if(cols3!=null)
    {
      let adj = document.getElementById("adj");
      let oList = document.createElement("ol");
      oList.setAttribute("class","list-group list-group-numbered");
      for(let i=0;i<cols3.length;i++)
      {
        if(cols3[i]=="")
          continue;
        let temp = document.createElement("li");
        temp.setAttribute("class","list-group-item my-2");
        temp.style.display="list-item";
        temp.innerHTML = cols3[i];
        oList.appendChild(temp);
      }
      adj.appendChild(oList);
      adj.style.display = "inherit";
    }
    if(cols4!=null)
    {
      let adv = document.getElementById("adv");
      let oList = document.createElement("ol");
      oList.setAttribute("class","list-group list-group-numbered");
      for(let i=0;i<cols4.length;i++)
      {
        if(cols4[i]=="")
          continue;
        let temp = document.createElement("li");
        temp.setAttribute("class","list-group-item my-2");
        temp.style.display="list-item";
        temp.innerHTML = cols4[i];
        oList.appendChild(temp);
      }
      adv.appendChild(oList);
      adv.style.display = "inherit";
    }
  } else {
    document.getElementById("err").style.display="block";
  }
  }catch(e){
    document.getElementById("err").style.display="block";
  }
}

fetchMeaning(serachValue);

const fetchTWL06Dic = async (serachValue) => {
  let newAlphabet = {
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

  let sum = 0
  let item = serachValue.toLowerCase()

  for (let i = 0; i < item.length; i++) {
    sum += newAlphabet[item[i]] || 0 // for unknown characters
  }

  try {
    let res = await fetch(`/.netlify/functions/gettwl06?search=${serachValue}`)
    
    let getData = await res.text()
    

    if (getData) {
      document.getElementsByClassName('found-word')[0].innerHTML = 'Yes'
      document.getElementsByClassName('word-score')[0].innerHTML =
        sum + ' ' + 'Points'
    } else {
      document.getElementsByClassName('found-word')[0].style.background =
        '#F34423'
      document.getElementsByClassName('found-word')[0].innerHTML = 'No'
    }
  } catch (error) {
    console.log(error)
  }
}
fetchTWL06Dic(serachValue)

const fetchSOWPODSDic = async (serachValue) => {
  let newAlphabet = {
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
  let sum = 0

  let item = serachValue.toLowerCase()

  for (let i = 0; i < item.length; i++) {
    sum += newAlphabet[item[i]] || 0 // for unknown characters
  }

  let res = await fetch(`/.netlify/functions/getsowpods?search=${serachValue}`)
  
  let getData = await res.text()
  

  if (getData) {
    document.getElementsByClassName('found-word')[1].innerHTML = 'Yes'
    document.getElementsByClassName('word-score')[1].innerHTML =
      sum + ' ' + 'Points'
  } else {
    document.getElementsByClassName('found-word')[1].style.background =
      '#F34423'
    document.getElementsByClassName('found-word')[1].innerHTML = 'No'
  }
}
fetchSOWPODSDic(serachValue)

const fetchEnableDic = async (serachValue) => {
  let newAlphabet = {
    a: 1,
    b: 4,
    c: 4,
    d: 2,
    e: 1,
    f: 4,
    g: 3,
    h: 3,
    i: 1,
    j: 10,
    k: 5,
    l: 2,
    m: 4,
    n: 2,
    o: 1,
    p: 4,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 2,
    v: 5,
    w: 4,
    x: 8,
    y: 3,
    z: 10,
  }
  let sum = 0
  let item = serachValue.toLowerCase()

  for (let i = 0; i < item.length; i++) {
    sum += newAlphabet[item[i]] || 0 // for unknown characters
  }

  let res = await fetch(`/.netlify/functions/getenable?search=${serachValue}`)
  
  let getData = await res.text()
  
  if (getData) {
    document.getElementsByClassName('found-word')[2].innerHTML = 'Yes'
    document.getElementsByClassName('word-score')[2].innerHTML =
      sum + ' ' + 'Points'
  } else {
    document.getElementsByClassName('found-word')[2].style.background =
      '#F34423'
    document.getElementsByClassName('found-word')[2].innerHTML = 'No'
  }
}

fetchEnableDic(serachValue)
