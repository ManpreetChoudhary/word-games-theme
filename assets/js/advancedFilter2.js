const fillterWrapper = document.querySelector('.fillterWrapper')
function myFunction() {
  fillterWrapper.classList.toggle('hide')
}
const close = document.querySelector('.fa-times')
close.addEventListener('click', () => {
  fillterWrapper.classList.add('hide')
})
