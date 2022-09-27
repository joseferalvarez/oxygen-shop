const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const scrollbar = document.querySelector(".scrollbar");
const returnBtn = document.querySelector(".return-button");

burger.addEventListener("click", () => {
    menu.classList.toggle("nav-visible");
    burger.classList.toggle("burger-close");
});

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = Math.round(((scrollTop) / (docHeight - winHeight)) * 100);

    scrollbar.style.width = scrollPercent + "%"
});

returnBtn.addEventListener("click", () => {
    setTimeout(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        })
    }, 200);
});
