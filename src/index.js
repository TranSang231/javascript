const create_Meetup = document.querySelector('.create-meetup');
const btn_create = document.querySelectorAll('.btn-create');
const btn_close = document.querySelector('.wrap-form .btn-close')

// Appear a form 
btn_create[0].addEventListener('click', () => {
    create_Meetup.classList.add("appear");
});

// Hide a form
btn_close.addEventListener('click', () => {
    create_Meetup.classList.remove("appear");
})