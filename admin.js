let modale = null

const ouvrirModale = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modale = target
    modale.addEventListener("click", fermerModale)
    modale.querySelector(".js-modale-fermer").addEventListener("click", fermerModale)
    modale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)


}

const fermerModale = function (e) {
    if (modale === null) return
    e.preventDefault()
    modale.style.display = "none"
    modale.setAttributeAttribute("aria-hidden", "true")
    modale.removeAttribute("aria-modal")
    modale.removeEventListener("click", fermerModale)
    modale.querySelector(".js-modale-fermer").removeEventListener("click", fermerModale)
    modale.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)
    modale = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", ouvrirModale)
})


