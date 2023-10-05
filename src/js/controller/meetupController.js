import { validationFunctions } from "../utils/validation.js";
import * as view from "../views/meetupView.js";
import * as model from "../models/meetupModel.js";

const createMeetupForm = document.querySelector('.create-meetup');
const meetupForm = createMeetupForm.querySelector('.form-meetup');
const buttonSubmit = meetupForm.querySelector(".btn-submit")

// check and submit form
export const handleSubmitForm = (event) => {
    event.preventDefault();
    view.displayButtonLoading(buttonSubmit);

    validationFunctions.map((validationFn) => validationFn());

    const isFormValid = validationFunctions.every((validationFn) => validationFn());

    if (isFormValid) {
        const cardId = meetupForm.querySelector('.meetup-id').value;

        const formDataObj = {};
        const inputs = meetupForm.querySelectorAll('.form-control');
        inputs.forEach((input) => {
            formDataObj[input.name] = input.value;
        })
        if (!cardId) {
            model.postMeetupData(formDataObj)
                .then(view.createMeetupCard)
                .then(meetupForm.reset())
                .then(() => {
                    view.hideButtonLoading(buttonSubmit)
                })
                .then(() => {
                    alert('Success!');
                    view.closeForm();
                });
        }
        else {
            model.editMeetupData(formDataObj, cardId)
                .then(view.updateCardData)
                .then(meetupForm.reset())
                .then(() => {
                    view.hideButtonLoading(buttonSubmit)
                })
                .then(() => {
                    alert('Success!');
                    view.closeForm();
                });
        }
    }
}

export const debounce = (func, delay) => {
    let timeout;

    return function executedFunc(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay);
    };
}