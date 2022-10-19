function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}



let firstName = document.getElementById('firstName')
let lastName = document.getElementById('Name')
let email = document.getElementById('email')
let message = document.getElementById('message')
let btnSubmit = document.querySelector('#send')

let contact = {
    prenom: firstName,
    nom: lastName.value,
    mail: email.value,
    msg: message.value,
}

btnSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    if (firstName.value != '' && lastName.value != '' && email.valuee != '' && message.value != '') {
        let contact = {
            prenom: firstName.value,
            nom: lastName.value,
            mail: email.value,
            msg: message.value,
        }
        console.log(contact)
    }
})

