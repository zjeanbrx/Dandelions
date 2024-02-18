import "@floating-ui/core";
import "@floating-ui/dom";

const input = document.querySelector('input')
const cards = document.querySelectorAll('main .card')
const error = document.querySelector('main .error')

input.addEventListener('input', filterCards)

function filterCards() {
    if(input.value != '') {

        for (let titulo of cards) {

            let title = titulo.querySelector('h2')

            title = title.textContent.toLowerCase()

            let inputtext = input.value.toLowerCase()

            if(!title.includes(inputtext)) {
                titulo.style.display = "none";
            }
            else {
                titulo.style.display = "flex"
            }
        }
    }
    else {
        for (let titulo of cards) {
            titulo.style.display = "flex"

        }
    }
}