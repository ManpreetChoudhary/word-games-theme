$(".nav-tabs a.nav-tab-link").click(function () {
    $(".nav-tabs  a.nav-tab-link").removeClass('active');
});

const detect = document.querySelector("#detect");
const wrapper = document.querySelector(".wrapper");
const closePopup = document.getElementsByClassName("closePopup");
const extensions = document.querySelector(".extensions")

const refresh = () => {
    location.reload()
}


let adsBtn = document.querySelector(".allow-ads-btn")
adsBtn.addEventListener("click", () => {
    extensions.classList.add("show")
})


let adClasses = ["ad", "ads", "adsbox", "doubleclick", "ad-placement", "ad-placeholder", "adbadge", "BannerAd"];
for (let item of adClasses) {
    detect.classList.add(item);
}

let getProperty = window.getComputedStyle(detect).getPropertyValue("display");
if (!wrapper.classList.contains("show")) {
    getProperty == "none" ? wrapper.classList.add("show") : wrapper.classList.remove("show");
}
closePopup[0].addEventListener("click", () => {
    console.log(true)
    wrapper.classList.remove("show");
});
closePopup[1].addEventListener("click", () => {
    extensions.classList.remove("show");
});