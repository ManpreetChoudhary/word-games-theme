const advancedFilter = document.querySelector('.advancedFilter')
const fillterWrapper = document.querySelector('.fillterWrapper')
advancedFilter.addEventListener('click', () => {
  fillterWrapper.classList.toggle('active')
  fillterWrapper.classList.remove('hide')
})

const close = document.querySelector('.fa-times')
close.addEventListener('click', () => {
  fillterWrapper.classList.remove('active')
  fillterWrapper.classList.add('hide')
})
