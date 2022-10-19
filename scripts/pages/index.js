async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
        {
            "name": "",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Autre data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
    ]
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers, ...photographers, ...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        //const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

////

const getData = async () =>
    await fetch('./data/photographers.json')
        .then(response => { if (response.ok) { return response.json() } }
        )
async function init() {
    const { photographers } = await getData();
    getPhotograph(photographers);
    // Récupère les datas des photographes
    //const { user } = await getPhotographers();
    //displayData(photographers);


};

init();



function getPhotograph(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach(photographe => {
        const templettePhotographers = new Photographers(photographe);
        photographersSection.innerHTML += templettePhotographers.createHTML();
        // console.log(photographers)
    })

}


/**for (i = 0; i < Array.length; i++) {
    let nb = 3;
    result = i * nb;
}*/


class Photographers {

    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.portrait = data.portrait;
        this.prix = data.price;
        this.tagline = data.tagline;
    }


    createHTML() {
        return `<article>
                <a href="photographer.html?photoGIµD=${this.id}">
                    <img src="assets/photographers/${this.portrait}">
                    <h2 class="name-photographers">${this.name}</h2>
                </a>
                <span class="country">${this.city},${this.country}</span>
                <span class="tagline">${this.tagline}</span>
                <span class="prix">${this.prix}€/jour</span>
            </article>
        `
    }

}