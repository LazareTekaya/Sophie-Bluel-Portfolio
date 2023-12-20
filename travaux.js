let works;

async function getAPI() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

// Importation photos gallerie

export async function init() {
    works = await getAPI();
    const sectionPhotos = document.querySelector('.gallery');

    function genererPhotos(photos) {
        sectionPhotos.innerHTML = "";

        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];

            const emplacementPhoto = document.createElement("figure");
            emplacementPhoto.dataset.id = photo.id;

            const image = document.createElement("img");
            image.src = photo.imageUrl;

            const descriptionPhoto = document.createElement("figcaption");
            descriptionPhoto.innerText = photo.title;

            emplacementPhoto.appendChild(image);
            emplacementPhoto.appendChild(descriptionPhoto);
            sectionPhotos.appendChild(emplacementPhoto);
        }
    }

    //filtrage des catégories

    async function filterWorks(categoryId, button) {
        let filteredWorks;

        if (categoryId === 0) {
            filteredWorks = works;
        } else {
            filteredWorks = works.filter(objets => objets.category.id === categoryId);
        }

        sectionPhotos.innerHTML = "";
        genererPhotos(filteredWorks);

        document.querySelectorAll(".btn-filtre").forEach(btn => {
            btn.classList.remove("btn-filtre__actif");
        });

        button.classList.add("btn-filtre__actif");
    }

    function addFilterEventListener(buttonClass, categoryId) {
        const bouton = document.querySelector(buttonClass);

        if (bouton === null) {
            return;
        }

        bouton.addEventListener("click", function () {
            filterWorks(categoryId, bouton);
        });
    }

    works = await getAPI();

    addFilterEventListener(".btn-objets", 1);
    addFilterEventListener(".btn-appartement", 2);
    addFilterEventListener(".btn-hotelresto", 3);
    addFilterEventListener(".btn-tous", 0);

    genererPhotos(works);
}

init();




// affichage de la modale //

let modale = null
let modale2 = null

const toggleModale = function (e) {
    if (e === undefined) {
        return

    };
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"));
    console.log("target : ", target)
    console.log("modale")
    if (modale === null) {
        e.preventDefault()
        console.log("modale marche po")
        target.style.display = null;
        target.removeAttribute("aria-hidden");
        target.setAttribute("aria-modal", "true");
        modale = target;

        modale.addEventListener("click", toggleModale);
        modale.querySelector(".js-modale-fermer").addEventListener("click", toggleModale);
        modale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation);
        photosModale();
    } else {
        e.preventDefault();
        modale.style.display = "none";
        modale.setAttribute("aria-hidden", "true");
        modale.removeAttribute("aria-modal");

        modale.removeEventListener("click", toggleModale);
        modale.querySelector(".js-modale-fermer").removeEventListener("click", toggleModale);
        modale.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation);

        modale = null;

        modale2.style.display = "none";
        modale2.setAttribute("aria-hidden", "true");
        modale2.removeAttribute("aria-modal");

        modale2.removeEventListener("click", toggleModale);
        modale2.querySelector(".js-modale-fermer").removeEventListener("click", toggleModale);
        modale2.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation);
        modale2 = null;
    }

    photosModale();
    lanceModale2();
};



const stopPropagation = function (e) {
    e.stopPropagation();
};

document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", toggleModale);
});

// affichage des photos dans la modale // 

function photosModale() {
    const sectionPhotos = document.querySelector(".photos");


    sectionPhotos.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const photos = works[i];

        const imageModale = document.createElement("article");
        imageModale.dataset.id = works[i].id;

        const pictureModale = document.createElement("img");
        pictureModale.src = photos.imageUrl;

        const iconeCorbeille = document.createElement("i");
        iconeCorbeille.className = "fa-solid fa-trash";
        iconeCorbeille.style.cursor = "pointer";
        iconeCorbeille.id = works[i].id;  // Ajoute l'ID à l'attribut id de l'icône

        iconeCorbeille.addEventListener("click", function (event) {
            event.stopPropagation();
            deleteProjects(iconeCorbeille.id);  // Utilise l'ID depuis l'attribut id

            // Si l'élément parent de l'icône est généré dynamiquement, vous pouvez le supprimer de la modale
            const parentElement = iconeCorbeille.parentElement;
            if (parentElement) {
                parentElement.remove();
            }
        });

        imageModale.appendChild(pictureModale);
        imageModale.appendChild(iconeCorbeille);  // Ajoute l'icône à l'article
        sectionPhotos.appendChild(imageModale);
    }
}


// Gestion de l'affichage des boutons admin
const token = localStorage.getItem("token");
const logout = document.querySelector(".logout");

function adminPanel() {
    document.querySelectorAll(".authElements").forEach(a => {
        console.log("adminpanel:%s", a)
        console.log("token:%s", token)
        if (token === null) {
            a.style.display = "none";
        } else {
            a.style.display = "inline-block";
            logout.innerHTML = "logout";
        }
    });

    document.querySelectorAll(".unauthElements").forEach(a => {
        console.log("adminpanel:%s", a)
        console.log("token:%s", token)
        if (token === null) {
            a.style.display = "flex";
        } else {
            a.style.display = "none";
        }
    });
}

adminPanel();

//suppression des projets dans la modale// 

async function deleteProjects(projectId) {
    console.log("debug suppression");
    console.log("id", projectId);
    console.log(token);

    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);
        console.log(document.querySelectorAll(`[data-id~="${projectId}"]`))

        if (response.status === 204) {
            console.log("DEBUG SUPPRESSION DU PROJET " + projectId);
            // Supprimer la photo du DOM sans actualiser la page
            const projectElement = document.getElementById(projectId);
            console.log(projectElement); // Vérifiez dans la console si l'élément est correctement trouvé
            const galleryElements = (document.querySelectorAll(`[data-id~="${projectId}"]`));
            console.log("element : ", galleryElements)
            if (galleryElements) {
                console.log("galleryElementsRemoved")
                galleryElements[0].remove();
            }
            if (projectElement) {
                projectElement.remove();
                refreshPage(projectId)
            }
            else {
                console.error(`L'élément avec l'ID ${projectId} n'a pas été trouvé dans le DOM.`);
            }
        } else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé(e) à supprimer ce projet, merci de vous connecter avec un compte valide");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.log(error);
    }
}


// Rafraichit les projets sans recharger la page
async function refreshPage(i) {
    photosModale(); // Re lance une génération des projets dans la modale admin

    // supprime le projet de la page d'accueil
    const projet = document.querySelector(`.js-projet-${i}`);
    projet.style.display = "none";
}
// fonction pour revevenir à la modale 1

const backToModale1 = function (e) {
    e.preventDefault();
    modale2.style.display = "none";
    modale2 = null;
    modale.style.display = null;
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-modal");
    photosModale(dataAdmin);
};

// fonction pour accéder à la modale 2

const lanceModale2 = function () {
    const btnAjouterPhoto = document.getElementById('btnAjouterPhoto');

    if (btnAjouterPhoto) {
        btnAjouterPhoto.addEventListener('click', function () {
            modale2 = document.getElementById('modale2');

            if (modale2) {
                modale.style.display = "none";
                modale.setAttribute("aria-hidden", "true");
                modale.removeAttribute("aria-modal");

                modale2.style.display = null;
                modale2.removeAttribute("aria-hidden");
                modale2.setAttribute("aria-modal", "true");

                const ajoutImageInput = document.querySelector('.ajout-image');
                ajoutImageInput.addEventListener('change', previewImage);

                // Ajoutez un écouteur d'événement sur le bouton js-modale-return
                const returnButton = modale2.querySelector(".js-modale-return");
                returnButton.addEventListener("click", backToModale1);
            }
        });
    }
};




// preview de l'image dans le module d'ajout photo

function previewImage(event) {
    const input = event.target;
    const preview = document.querySelector('#photo-preview');
    const formGroupPhoto = document.querySelector('.form-group-photo');

    const file = input.files[0];

    if (file) {
        if (file.size > 4194304) {
            alert("Please upload an image with a maximum size of 4MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';

            formGroupPhoto.innerHTML = '';
            formGroupPhoto.appendChild(preview);
            formGroupPhoto.appendChild(input);
        };

        reader.readAsDataURL(file);
    } else {
        preview.src = '#';
        preview.style.display = 'none';

        formGroupPhoto.innerHTML = '<i class="fa-regular fa-image"></i> <label for="photo">+ Ajouter une photo</label> <input type="file" name="photo" id="photo" class="ajout-image"> <p>jpg, png : 4mo max</p>';
    }
}

const btnAjoutProjet = document.querySelector(".btn-ajout");
btnAjoutProjet.addEventListener("click", ajouterPhoto);


// ajout d'une photo via d'admin

async function ajouterPhoto(event) {
    event.preventDefault();
    console.log('ajouterPhoto called');

    const title = document.querySelector(".ajout-titre").value;
    const categoryId = document.querySelector(".ajout-categoryId").value;
    const image = document.querySelector(".ajout-image").files[0];


    if (title === "" || categoryId === "" || image === undefined) {
        alert("Veuillez compléter les champs");
        return;
    } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        alert("Merci de sélectionner une catégorie");
        return;
    } else {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", categoryId);
            formData.append("image", image);

            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 201) {
                alert("Votre photo a bien été ajouté");
                photosModale(dataAdmin);
                genererPhotos(data, null);

            } else if (response.status === 400) {
                alert("Merci de compléter tous les champs");
            } else if (response.status === 500) {
                alert("Erreur serveur");
            } else if (response.status === 401) {
                alert("Non habilité à ajouter une photo");
                window.location.href = "login.html";
                //else ?
            }
        }

        catch (error) {
            console.log(error);
        }
    }
}
