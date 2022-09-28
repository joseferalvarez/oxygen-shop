const URL_USER = "https://jsonplaceholder.typicode.com/posts";
const URL_CURRENCIES = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
const BASIC_PRICE = 0;
const PROFESSIONAL_PRICE = 25;
const PREMIUM_PRICE = 60;
const REGEXP_NAME = /^.{2,100}$/;
const REGEXP_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*Variables del popup*/
const scrollbar = document.querySelector(".scrollbar");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const sendBtn = document.querySelector(".send");

/*Variables del slider*/
let index = 0;
let slides = document.getElementsByClassName("slider__img");
let buttons = document.getElementsByClassName("slider__button");

/*Abre un popup que no ha sido cerrado en 5 segundos*/
setTimeout(() => {
    if (!localStorage.getItem("popupState") && !sessionStorage.getItem("popupState")) {
        popup.classList.add("popup-visible");
        popupContainer.classList.add("popup__container-front");
    }
}, 5000);

/*Abre y cierra el menu al pinchar en la hamburguesa*/
document.querySelector(".burger").addEventListener("click", (e) => {
    document.querySelector(".nav").classList.toggle("nav-visible");
    e.target.classList.toggle("burger-close");
});

/*Actualiza la barra de porcentaje y activa el popup al 25%*/
window.addEventListener("scroll", () => {
    let scrollPercent = Math.round(((window.scrollY) / (document.body.offsetHeight - window.innerHeight)) * 100);

    setScrollPopup(scrollPercent);
    scrollbar.style.width = scrollPercent + "%"
});

/*Cierra el popup en la X y actualiza el local y session storage*/
document.querySelector(".popup__cross").addEventListener("click", () => {
    popup.classList.remove("popup-visible");
    popupContainer.classList.remove("popup__container-front");

    localStorage.setItem("popupState", "1");
    sessionStorage.setItem("popupState", "1");
});

/*Cierra el popup con ESC y actualiza el local y session storage*/
window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        popup.classList.remove("popup-visible");
        popupContainer.classList.remove("popup__container-front");
    }
    localStorage.setItem("popupState", "1");
    sessionStorage.setItem("popupState", "1");
});

/*Cierra el popup clicando fuera y actualiza el local y session storage*/
window.addEventListener("click", (e) => {
    if (!popup.contains(e.target)) {
        popup.classList.remove("popup-visible");
        popupContainer.classList.remove("popup__container-front");
        localStorage.setItem("popupState", "1");
        sessionStorage.setItem("popupState", "1");
    }
});

/*Envia los datos de email a un servidor*/
document.querySelector(".popup__button").addEventListener("click", () => {
    let email = document.querySelector(".popup__input");

    if (REGEXP_EMAIL.test(email.value)) {
        sendForm(email, "", URL_USER)
        popup.classList.remove("popup-visible");
        localStorage.setItem("popupState", "1");
        sessionStorage.setItem("popupState", "1");
    } else {
        email.classList.add("input-error");
    }
});

/*Vuelve al inicio de la pagina al pulsar el boton*/
const returnBtn = document.querySelector(".return-button").addEventListener("click", () => {
    setTimeout(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        })
    }, 200);
});

/*Envia los datos del formulario a un servidor*/
sendBtn.addEventListener("click", () => {
    let name = document.querySelector(".contact__input-name");
    let email = document.querySelector(".contact__input-email");
    let check = document.querySelector(".contact__policies-checkbox");

    if (!REGEXP_NAME.test(name.value)) {
        name.classList.add("input-error");
    } else {
        name.classList.remove("input-error");
    }
    if (!REGEXP_EMAIL.test(email.value)) {
        email.classList.add("input-error");
    } else {
        email.classList.remove("input-error");
    }

    if (REGEXP_NAME.test(name.value) && REGEXP_EMAIL.test(email.value) && check.checked) {
        sendForm(name.value, email.value, URL_USER);
    }
});

/*Cambia las divisas de monedas*/
document.querySelector(".select__pricing").addEventListener("change", (e) => {
    let currencie = (e.target.value).toLowerCase();
    let cardBasic = (document.querySelector(".card__price-basic"));
    let cardProfessional = document.querySelector(".card__price-professional");
    let cardPremium = document.querySelector(".card__price-premium");

    const promise = fetch(URL_CURRENCIES)
        .then(response => response.json())
        .then(data => {
            if (currencie === "eur") {
                cardBasic.innerText = "€" + ((data.usd.eur * BASIC_PRICE).toFixed(2));
                cardProfessional.innerText = "€" + (data.usd.eur * PROFESSIONAL_PRICE).toFixed(2);
                cardPremium.innerText = "€" + (data.usd.eur * PREMIUM_PRICE).toFixed(2);
            } else if (currencie === "gbp") {
                cardBasic.innerText = "£" + ((data.usd.eur * BASIC_PRICE).toFixed(2));
                cardProfessional.innerText = "£" + (data.usd.gbp * PROFESSIONAL_PRICE).toFixed(2);
                cardPremium.innerText = "£" + (data.usd.gbp * PREMIUM_PRICE).toFixed(2);
            } else {
                cardBasic.innerText = "$" + BASIC_PRICE;
                cardProfessional.innerText = "$" + PROFESSIONAL_PRICE;
                cardPremium.innerText = "$" + PREMIUM_PRICE;
            }
        });
});

/*Muestra el slider anterior*/
document.querySelector(".arrow-left").addEventListener("click", () => {
    nextSlide(-1);
})

/*Muestra el slider siguiente*/
document.querySelector(".arrow-right").addEventListener("click", () => {
    nextSlide(1);
})

/*Muestra el slider correspondiente al boton*/
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        showSlide(i);
    });
}

/*Envia al servidor el email y nombre de contacto*/
async function sendForm(email, name, url) {
    await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            name: name,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json());
}

/*Muestra el popup cuando la pagina este al 25%*/
function setScrollPopup(percent) {
    if (percent === 25 && !localStorage.getItem("popupState")) {
        popup.classList.add("popup-visible");
        popupContainer.classList.add("popup__container-front");
    }
}

/*Aumenta o reduce el indice del slide*/
function nextSlide(n) {
    index += n;
    if (index >= slides.length) {
        index = 0;
    }
    if (index < 0) {
        index = slides.length - 1;
    }
    showSlide(index);
}

/*Muestra el slider actual y esconde el resto*/
function showSlide(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        buttons[i].classList.remove("slider__button-active");
    }

    slides[n].style.display = "block";
    buttons[n].classList.add("slider__button-active");
}


