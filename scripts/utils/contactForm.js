/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars, space-before-function-paren
function displayModal() {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
}

// eslint-disable-next-line space-before-function-paren
function closeModal() {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

// eslint-disable-next-line space-before-function-paren
function closeModalKeyboard() {
  const modal = document.getElementById('contact_modal')
  modal.addEventListener('keydown', (e) => {
    e.key == 'Enter' ? modal.style.display = 'none' : ''
  })
}

const firstName = document.getElementById('firstName')
const lastName = document.getElementById('Name')
const email = document.getElementById('email')
const message = document.getElementById('message')
const btnSubmit = document.querySelector('#send')

const contact = {
  prenom: firstName,
  nom: lastName.value,
  mail: email.value,
  msg: message.value
}

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  if (firstName.value != '' && lastName.value != '' && email.valuee != '' && message.value != '') {
    const contact = {
      prenom: firstName.value,
      nom: lastName.value,
      mail: email.value,
      msg: message.value
    }
    console.log(contact)
  }
})
