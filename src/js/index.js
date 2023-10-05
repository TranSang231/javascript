import * as model from "./models/meetupModel.js";
import * as view from "./views/meetupView.js";
import {fieldHandlers} from "./utils/validation.js";
import { handleSubmitForm, debounce } from "./controller/meetupController.js";
import { CONFIRM_DELETE, CONFIRM_CLOSE} from "./constants/message.js";
    
// selecting main content
const meetups = document.querySelector('.meetups');
const createMeetupForm = document.querySelector('.create-meetup');

// selecting meetup cards wrapper
const wrapCards = meetups.querySelector('.wrap-topic-cards')

// selecting form and its elements
const meetupForm = createMeetupForm.querySelector('.form-meetup');

// selecting buttons 
const btnCreate = meetups.querySelector('.btn-create');
const btnClose = createMeetupForm.querySelector('.wrap-form .btn-close')

/* ---------EVENTS LISTENER--------------------------------------------------------------*/
// render topic cards when load page
model.getMeetups()
    .then(view.renderMeetupCards)
    .then(view.hideButtonLoadingMeetupCard);

// close form when click button close
btnClose.addEventListener('click', view.closeForm)

// close form when click outside form
createMeetupForm.querySelector(".background").addEventListener('click', (event) => {
    const self = event.target.closest('.wrap-form');
    if (!self) {
        const result = confirm(CONFIRM_CLOSE);
        if (result) {
            view.closeForm();
        }
    }
})

// open the form when click button create 
btnCreate.addEventListener('click', view.openCreateForm);

// submit form meetup when click submit button
meetupForm.addEventListener('submit', handleSubmitForm)

// delete or editing a meetup when click button delete or edit 
wrapCards.addEventListener('click', (event) => {
    if (event.target.matches('.btn-delete')) {
        const result = confirm(CONFIRM_DELETE);
        if (result) {
            view.displayButtonLoading(event.target);
            const card = event.target.parentNode.parentNode;
            const cardId = card.getAttribute("id").slice(11);
            model.deleteMeetupData(cardId)
                .then(view.hideButtonLoading(event.target))
                .then(card.remove());
        }
    }

    if (event.target.matches('.btn-edit')) {
        view.displayButtonLoading(event.target);
        const card = event.target.parentNode.parentNode;
        const cardId = card.getAttribute("id").slice(11);
        model.getMeetups(cardId)
            .then(view.polulateFormWithData)
            .then(() => {
                view.hideButtonLoading(event.target)
                view.openEditForm();
                view.enabledSubmitButton();
            });
    }
})

// check inputs valid or invalid (while typing) before submit 
meetupForm.addEventListener('input', debounce(function (event) {
    const fieldId = event.target.id;
    const fieldHandler = fieldHandlers[fieldId];

    if (fieldHandler) {
        fieldHandler();
    }
}, 1000))
