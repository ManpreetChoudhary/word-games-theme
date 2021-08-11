let main = document.querySelector('.main')
let tab_container = document.querySelector('.tab_container')

var sortValue
var sortBool = false

var theSelect = document.getElementById('select_dropDown')

let tabs = document.getElementsByClassName('tab_link')
tabs[0] ? tabs[0].classList.add('active-tab') : ''
// handling of filter on scroll
window.onscroll = function () {
  var section = document.querySelectorAll('.allGroupWords')
  console.log(section)
  let new_sections = {}
  Array.prototype.forEach.call(section, function (e) {
    if (document.body.clientWidth > 991) {
      new_sections[e.id] = e.offsetTop - 10
    } else {
      new_sections[e.id] = e.offsetTop - 10
    }
  })
  var scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop
  for (i in new_sections) {
    let sort_val = document.querySelector('.sort-select').value
    if (
      i.split('_')[0] == sort_val &&
      new_sections[i] &&
      new_sections[i] <= scrollPosition
    ) {
      document.querySelector('.active-tab').classList.remove('active-tab')
      var active_now = document.querySelector('#Tab_' + i.split('_')[1])
      active_now.classList.add('active-tab')
      // active_now.scrollIntoView()
    }
  }
}

// Add Filtering
let sections = {}
function filterLinks(id) {
  let tabs = document.getElementsByClassName('tab_link')
  tabs[0] ? tabs[0].classList.add('active-tab') : ''

  Array.from(tabs).map((item) => {
    item.classList.remove('active-tab')
  })
  main.innerHTML += ``
  let activeLetter = event.target
  activeLetter.classList.add('active-tab')

  var section = document.querySelectorAll('.wordlistContainer')
  var sort_val = document.querySelector('.sort-select').value
  Array.prototype.forEach.call(section, function (e) {
    if (document.body.clientWidth > 991) {
      sections[e.id] = e.offsetTop - 10
    } else {
      sections[e.id] = e.offsetTop - 10
    }
  })

  document.body.scrollTop = sections[sort_val + '_' + id] + 5
}

// next && previous functionality
let prev = document.getElementById('prev')
let next = document.getElementById('next')

if (prev) {
  prev.onclick = scroll_Right
}
if (next) {
  next.onclick = scroll_Left
}
window.addEventListener('resize', function () {
  scroll_visible()
})
window.addEventListener('scroll', function () {
  scroll_visible()
})
function scroll_visible() {
  let tab_container = document.querySelector('#tab-container')
  if (tab_container) {
    if (tab_container.clientWidth === tab_container.scrollWidth) {
      prev.style.display = 'none'
      next.style.display = 'none'
    } else {
      prev.style.display = 'block'
      next.style.display = 'block'
    }
  }
}
scroll_visible()

function scroll_Left() {
  tab_container.scrollLeft += 130
}
function scroll_Right() {
  tab_container.scrollLeft -= 130
}

const fillterWrapper = document.querySelector('.fillterWrapper')
function myFunction() {
  fillterWrapper.classList.toggle('hide')
}
const close = document.querySelector('.times')
close.addEventListener('click', () => {
  fillterWrapper.classList.add('hide')
})
