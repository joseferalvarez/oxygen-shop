const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");

burger.addEventListener("click", () => {
    menu.classList.toggle("nav-visible");
    burger.classList.toggle("burger-close");
});
