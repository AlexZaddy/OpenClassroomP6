//Mettre le code JavaScript lié à la page photographer.html
/**je recuperez l id
 * je recupere les photographe 
 * je recuper le photographe qui correspond a l'id donner
 * cree l entête de deu photographe 
 * trie les media qui correspond a l'id du photographe 
 * cree la class image et video
 * cree la media factorie
 * trie les class
 * cree fonction pour mettre a jour la galerie 
 * 
 **/
//lecteure d'ecran
//metre titre de la light box
// verifier validation
//achecke

headerPhotograph = document.querySelector('.photograph-header')
modalLight = document.getElementById('modal-light')
likePrice = document.getElementById('likeprice');
photoContent = document.getElementById('photo-content')
info = document.querySelector('.info')
url = document.URL.split('=');
id = url[1];
const selectTri = document.querySelector('#tri')
let tabMedia = [];
modalName = document.getElementById('grapher');

/// fichier
folder = {
    '243': 'Mimi',
    '930': 'Ellie_Rose',
    '82': 'Tracy',
    '527': 'Nabeel',
    '925': 'Rhode',
    '195': 'Marcel',
}


// req asynchrone 
const getData = async () =>
    await fetch('./data/photographers.json')
        .then(res => { if (res.ok) { return res.json() } })


//
const getPhotographers = async () => {
    const { photographers, media } = await getData();
    result = 0
    tabIndex = 0
    tabIndexheart = 0

    /// header photographer
    photographers.map(elmt => {
        if (elmt.id == id) {
            headerInfo = new PagePhotographers(elmt)
            info.innerHTML += headerInfo.infoPhotographer()
            headerPhotograph.innerHTML += headerInfo.photoProfil()
            likePrice.innerHTML += headerInfo.Price()
            modalName.innerText = elmt.name

        } else {
            ''
        }
    });

    // creation des elements dans la page 
    media.map(elmt => {
        if (elmt.photographerId == id) {
            objImage = new MediaFactorie(elmt)
            photoContent.innerHTML += objImage.creatHtml(folder[id])
            //
            tabIndex++
            if (tabIndex > tabIndexheart)
                tabIndexheart = tabIndex + 1
            else
                ''

            if (tabIndex == tabIndexheart)
                tabIndex = tabIndexheart + 1

            nb = elmt.price
            result = nb + result;
            //console.log(objImage)

        }
    })


    // triller le contenus selon la l'option choisie
    selectTri.addEventListener('change', (event) => {
        // console.log(event.target.value)
        switch (event.target.value) {
            case 'Date':
                tabMedia = [];
                photoContent.innerHTML = '';
                media.map(elmt => {
                    if (elmt.photographerId == id) {
                        //sort 
                        tabMedia.push(elmt)
                        sortObj(tabMedia, elmt.date, elmt.date, event.target.value)

                    }
                }),
                    //
                    //photoContent.innerHTML = '';
                    tabMedia.forEach(elmt => {
                        build = new MediaFactorie(elmt)
                        photoContent.innerHTML += build.creatHtml(folder[id])
                        addLike()
                        ligthBox()
                        focusElmt()


                    })
                break;

            case 'titre':
                tabMedia = [];
                media.map(elmt => {
                    if (elmt.photographerId == id) {
                        //sort 
                        tabMedia.push(elmt)
                        sortObj(tabMedia, elmt.date, elmt.date, event.target.value)
                    }
                }),
                    //
                    photoContent.innerHTML = '';
                tabMedia.forEach(elmt => {
                    build = new MediaFactorie(elmt)

                    photoContent.innerHTML += build.creatHtml(folder[id])
                    addLike()
                    ligthBox()
                    focusElmt()


                })
                break;

            case 'popularite':
                tabMedia = [];
                media.map(elmt => {
                    if (elmt.photographerId == id) {
                        //sort 
                        tabMedia.push(elmt)
                        sortObj(tabMedia, elmt.date, elmt.date, event.target.value)
                    }
                }),
                    //
                    photoContent.innerHTML = '';
                tabMedia.forEach(elmt => {
                    build = new MediaFactorie(elmt)

                    photoContent.innerHTML += build.creatHtml(folder[id])
                    addLike()
                    ligthBox()
                    focusElmt()


                })
                break;
            default:
                focusElmt()
                addLike()
                ligthBox()
                break;
        }
    })
    focusElmt()
    addLike()
    ligthBox()

    likePrice.innerHTML += objImage.like(result)
}

const focusElmt = () => {

    const tabDIV = photoContent.children
    const heart = document.querySelectorAll('.fa-heart')

    for (let i = 0; i < tabDIV.length; i++) {
        tabDIV[i].addEventListener('focus', () => {
            tabDIV[i].addEventListener('keydown', (e) => {
                if (e.key == "Enter") {
                    tabDIV[i].children[0].click()
                }
            })
        })
    }

    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener('focus', () => {
            heart[i].addEventListener('keydown', (e) => {
                e.key == "f" ? heart[i].click() : ''
            })
        })
    }

}


const launch = () => {
    getPhotographers()
}

//header Photographer class pour construire le header
class PagePhotographers {

    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.portrait = data.portrait;
        this.prix = data.price;
        this.tagline = data.tagline;
    }

    infoPhotographer() {
        return `
            <h1>${this.name}</h1>
            <h2>${this.city},${this.country}</h2>
            <span>${this.tagline}</span>
        `
    }

    photoProfil() {
        return `
            <img class="photoProfil" src="assets/photographers/${this.portrait}">
        `
    }
    // prix a afficher
    Price() {


        return `
            <div>${this.prix}€/jour</div>
            `
    }

}


class ImagePhotographers {
    constructor(data) {
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.date = data.date;
        this.id = data.id;
        this.image = data.image;
        this.likes = data.likes;
        this.price = data.price;

    }

    creatHtml(folder) {

        return `
        <div tabindex="${tabIndex}">
            <img class="imageGrapher" src="Sample_Photos/${folder}/${this.image}">
            <div class="flex infoImg">
                <h3>${this.title}</h3>
                <div>${this.likes}
                <i tabindex="${tabIndexheart}" class="fa-solid fa-heart">
                </i>
                </div>
            </div>
            </div>
            `
    }
    like(result) {
        return `
       <p class="heart">${result}<i class="fa-solid fa-heart"></i></p>
        `
    }

}

class PhotographerVideo {
    constructor(data) {
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.date = data.date;
        this.id = data.id;
        this.likes = data.likes;
        this.price = data.price;
        this.video = data.video;


    }

    creatHtml(folder) {


        return `
        <div tabindex="${tabIndex}">
        <video class="imageGrapher" src="Sample_Photos/${folder}/${this.video}">
        </video>
        <div class="flex infoImg">
        <h3>${this.title}</h3>
        <div>${this.likes}
        <i tabindex="${tabIndexheart}" class="fa-solid fa-heart"></i>
        </div>
        </div>
        </div>
        `
    }




}
class MediaFactorie {
    constructor(data) {
        if (data.hasOwnProperty('image')) {
            return new ImagePhotographers(data)
        } else {
            return new PhotographerVideo(data)
        }
    }
}






//ligthBox 
addLike = () => {
    heart = document.querySelector('.heart')
    tagImgBox = photoContent.children
    for (let i = 0; i < tagImgBox.length; i++) {
        tagImgBox[i].children[1].children[1].addEventListener('click', () => {
            //
            like = parseInt(tagImgBox[i].children[1].children[1].innerHTML) + 1
            tagImgBox[i].children[1].children[1].innerHTML = like + `<i class="fa-solid fa-heart"></i>`
            //
            addHeart = parseInt(heart.innerHTML) + 1;
            heart.innerHTML = addHeart + '<i class="fa-solid fa-heart"></i>'

        })

    }
}

//modal img
ligthBox = () => {
    tagImgBox = photoContent.children
    boxImglight = document.querySelector('.imgBox')
    let title = document.querySelector('.title');
    croix = document.querySelector('.fa-xmark')
    right = document.querySelector('.fa-chevron-right')
    left = document.querySelector('.fa-chevron-left')
    let n = null


    croix.addEventListener('click', () => { modalLight.style.display = 'none'; })
    croix.addEventListener('keydown', (e) => { e.key == "Enter" ? modalLight.style.display = 'none' : '' })
    left.addEventListener('click', () => { n--;; back(); flipImg(); })
    right.addEventListener('click', () => { n++;; back(); flipImg(); })

    document.addEventListener('keydown', (event) => {

        if (event.key == 'ArrowLeft') {
            n--
            back()
            flipImg()

        }
        else if (event.key == 'ArrowRight') {
            console.log(event.key)
            n++
            back()
            flipImg()
        }
        else {
            ''
        }
    })


    for (let i = 0; i < tagImgBox.length; i++) {
        //
        tagImgBox[i].children[0].id = i.toString()
        //

        tagImgBox[i].children[0].addEventListener('click', () => {
            //
            n = tagImgBox[i].children[0].id
            imgLight = document.getElementById('imgBox')
            modalLight.style.display = 'flex';
            //
            back = () => {
                if (n > tagImgBox.length) {
                    if (document.getElementById(n) && document.getElementById(n).tagName == "VIDEO") {
                        n = 0
                        imgLight.innerHTML = `<video controls class="imgBox" src="${document.getElementById(n).attributes.src.value}" alt="image du photographe"></video>`
                        title.innerText = tagImgBox[n].children[1].children[0].innerText
                    }
                    else if (document.getElementById(n) && document.getElementById(n).tagName != "VIDEO") {
                        imgLight.innerHTML = `<img class="imgBox" src="${document.getElementById(n).attributes.src.value}" alt="image du photographe">`
                        title.innerText = tagImgBox[n].children[1].children[0].innerText


                    } else {
                        n = 0
                    }

                } else if (n <= -1) {
                    if (document.getElementById(n) && document.getElementById(n).tagName == "VIDEO") {
                        n = 0
                        imgLight.innerHTML = `<video controls class="imgBox" src="${document.getElementById(n).attributes.src.value}" alt="image du photographe"></video>`
                        title.innerText = tagImgBox[n].children[1].children[0].innerText
                    }
                    else if (document.getElementById(n) && document.getElementById(n).tagName != "VIDEO") {
                        imgLight.innerHTML = `<img class="imgBox" src="${document.getElementById(n).attributes.src.value}" alt="image du photographe">`
                        title.innerText = tagImgBox[n].children[1].children[0].innerText


                    } else {
                        n = tagImgBox.length;

                        //imgLight.innerHTML = `<img class="imgBox" src="${document.getElementById(n)?.attributes.src.value}" alt="image du photographe">`
                        ///title.innerText = tagImgBox[n]?.children[1].children[0].innerText

                    }

                }
            }
            //

            flipImg = () => {
                //
                if (n !== tagImgBox[i].children[0].id && document.getElementById(n) && document.getElementById(n).tagName != "VIDEO") {
                    imgLight.innerHTML = `<img class="imgBox" src="${document.getElementById(n).attributes.src.value}" alt="image du photographe">`
                    title.innerText = tagImgBox[n].children[1].children[0].innerText
                    //imgLight.attributes.src.value = tagImgBox[i].children[0].attributes.src.value

                } else if (n !== tagImgBox[i].children[0].id && document.getElementById(n) && document.getElementById(n).localName == 'video') {
                    imgLight.innerHTML = '<video controls class="imgBox" src="' + document.getElementById(n).attributes.src.value + '"></video>'
                    title.innerText = tagImgBox[n].children[1].children[0].innerText
                } else if (n == tagImgBox[i].children[0].id) {
                    if (document.getElementById(n) && document.getElementById(n).tagName != "VIDEO") {
                        imgLight.innerHTML = `<img class="imgBox" src="${document.getElementById(n).attributes.src.value}" alt="image du photographe">`
                        title.innerText = tagImgBox[n].children[1].children[0].innerText
                    } else {
                        imgLight.innerHTML = '<video controls class="imgBox" src="' + document.getElementById(n).attributes.src.value + '"></video>'
                        title.innerText = tagImgBox[n].children[1].children[0].innerText
                    }

                }


                //title.innerHTML = tagImgBox[i].children[1].children[0].innerText
            }

            flipImg()
        })

    }

}

function sortObj(array, a, b, value) {
    if (value == 'Date') {
        array.sort((a, b) => {
            if (a.date > b.date)
                return -1;
            if (a.date < b.date)
                return 1;
            return 0;
        })
    } else if (value == 'popularite') {
        array.sort((a, b) => {
            if (a.likes > b.likes)
                return -1;
            if (a.likes < b.likes)
                return 1;
            return 0;
        })
    } else {
        array.sort((a, b) => {
            if (a.title[0] < b.title[0])
                return -1;
            if (a.title[0] > b.title[0])
                return 1;
            return 0;
        })
    }

}



launch()
