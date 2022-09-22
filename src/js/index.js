const burger = document.querySelector(".burger");
const menu = document.querySelector(".navigation");

burger.addEventListener("click", () => {
    menu.classList.toggle("navwatch");
    burger.classList.toggle("burger__close");
});
