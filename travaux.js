async function getAPICategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}

async function getAPI() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

const categories = await getAPICategories();
const works = await getAPI();

export function genererPhotos(works) {
    const sectionPhotos = document.querySelector(".gallery");
    sectionPhotos.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const photos = works[i];

        const emplacementPhoto = document.createElement("figure");
        emplacementPhoto.dataset.id = works[i].id;

        const pictures = document.createElement("img");
        pictures.src = photos.imageUrl;
        const descriptionPhoto = document.createElement("figcaption");
        descriptionPhoto.innerText = photos.title;

        sectionPhotos.appendChild(emplacementPhoto);
        emplacementPhoto.appendChild(pictures);
        emplacementPhoto.appendChild(descriptionPhoto);
    }
}

genererPhotos(works);

function photosModale() {
    const sectionPhotos = document.querySelector(".photos");

    sectionPhotos.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const photos = works[i];

        const imageModale = document.createElement("article");
        imageModale.dataset.id = works[i].id;

        const pictureModale = document.createElement("img");
        pictureModale.src = photos.imageUrl;

        imageModale.appendChild(pictureModale);
        sectionPhotos.appendChild(imageModale);
    }
}

const boutonObjets = document.querySelector(".btn-objets");

boutonObjets.addEventListener("click", function () {


    const objetsFiltrees = works.filter(function (objets) {
        return objets.category.id === 1;
    });
    const sectionPhotos = document.querySelector(".gallery");
    sectionPhotos.innerHTML = "";
    genererPhotos(objetsFiltrees);
    photosModale()

});

const boutonAppartement = document.querySelector(".btn-appartement");

boutonAppartement.addEventListener("click", function () {

    const objetsFiltrees = works.filter(function (objets) {
        return objets.category.id === 2;
    });
    const sectionPhotos = document.querySelector(".gallery");
    sectionPhotos.innerHTML = "";
    genererPhotos(objetsFiltrees);
    photosModale()

});

const boutonHotelResto = document.querySelector(".btn-hotelresto");

boutonHotelResto.addEventListener("click", function () {

    const objetsFiltrees = works.filter(function (objets) {
        return objets.category.id === 3;
    });
    const sectionPhotos = document.querySelector(".gallery");
    sectionPhotos.innerHTML = "";
    genererPhotos(objetsFiltrees);
    photosModale()

});

const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function () {

    const sectionPhotos = document.querySelector(".gallery");
    sectionPhotos.innerHTML = "";
    genererPhotos(works);
    photosModale()

});

photosModale()






