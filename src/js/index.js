const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const scrollbar = document.querySelector(".scrollbar");
const returnBtn = document.querySelector(".return-button");
const sendBtn = document.querySelector(".send");
const selectPrices = document.querySelector(".select__pricing");

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

sendBtn.addEventListener("click", () => {
    let name = document.querySelector(".contact__input-name");
    let email = document.querySelector(".contact__input-email");
    let check = document.querySelector(".contact__policies-checkbox");
    const url = "https://jsonplaceholder.typicode.com/posts";
    const regexpName = /^.{2,100}$/;
    const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexpName.test(name.value)) {
        name.classList.add("contact__input-bad");
    } else {
        name.classList.remove("contact__input-bad");
    }
    if (!regexpEmail.test(email.value)) {
        email.classList.add("contact__input-bad");
    } else {
        email.classList.remove("contact__input-bad");
    }

    if (regexpName.test(name.value) && regexpEmail.test(email.value) && check.checked) {
        sendForm(name.value, email.value, url);
    }

});

selectPrices.addEventListener("change", () => {
    let currencie = (selectPrices.value).toLowerCase();
    const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
    let cardProfessional = document.querySelector(".card__price-professional")
    let cardPremium = document.querySelector(".card__price-premium");

    const promise = fetch(URL)
        .then(response => response.json())
        .then(data => {
            if (currencie === "eur") {
                cardProfessional.innerText = "$" + (data.usd.eur * 25).toFixed(2);
                cardPremium.innerText = "$" + (data.usd.eur * 60).toFixed(2);
            } else if (currencie === "gbp") {
                cardProfessional.innerText = "$" + (data.usd.gbp * 25).toFixed(2);
                cardPremium.innerText = "$" + (data.usd.gbp * 60).toFixed(2);
            } else {
                cardProfessional.innerText = "$25";
                cardPremium.innerText = "$60";
            }
        });
});


function sendForm(email, name, url) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            name: name,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
