import * as MESSAGE from "../constants/message.js";

const createMeetupForm = document.querySelector('.create-meetup');
// selecting form and its elements
const meetupForm = createMeetupForm.querySelector('.form-meetup');
const userNameEl = meetupForm.querySelector('#name')
const ageEl = meetupForm.querySelector('#age')
const topicEl = meetupForm.querySelector('#topic')
const avatarEl = meetupForm.querySelector('#avatar')
const dateEl = meetupForm.querySelector('#date')
const locationEl = meetupForm.querySelector('#location')
const fromtimeEl = meetupForm.querySelector('#fromtime')
const endtimeEl = meetupForm.querySelector('#endtime')
const noteEl = meetupForm.querySelector('#note')

// Check if inputs is required
const isRequired = (value) => value === '' ? false : true;

// Check if the length is between a specified minimun and maximun value
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// show error signal if inputs are invalid
const showError = (input, message) => {
    const groupForm = input.parentNode;

    groupForm.classList.remove('success');
    groupForm.classList.add('error');

    const error = groupForm.querySelector('small');
    error.textContent = message
}

// show success signal if inputs are valid
const showSuccess = (input) => {
    const groupForm = input.parentElement;

    groupForm.classList.remove('error');
    groupForm.classList.add('success');

    const error = groupForm.querySelector('small');
    error.textContent = '';
}

// Check inputs form are valid or not 
const checkUserName = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const userName = userNameEl.value.trim();

    if (!isRequired(userName)) {
        showError(userNameEl, MESSAGE.CANNOT_BE_BLANK('user name'));
    } else if (!isBetween(userName.length, min, max)) {
        showError(userNameEl, MESSAGE.LENGTH_IS_INVALID('user name', min, max))
    } else {
        showSuccess(userNameEl);
        valid = true;
    }
    return valid;
}

const checkAge = () => {
    let valid = false;
    let min = 18,
        max = 120;
    const age = ageEl.value.trim();

    if (!isRequired(age)) {
        showError(ageEl, MESSAGE.CANNOT_BE_BLANK('age'));
    } else if (!Number.isInteger(parseFloat(age))) {
        showError(ageEl, MESSAGE.MUST_BE_INTERGER('age'));
    } else if (!isBetween(parseFloat(age), min, max)) {
        showError(ageEl, MESSAGE.LENGTH_IS_INVALID('age', min, max));
    } else {
        showSuccess(ageEl);
        valid = true;
    }
    return valid;
}

const checkAvatar = () => {
    let valid = false;
    const avatar = avatarEl.value.trim();
    if (!isRequired(avatar)) {
        showError(avatarEl, MESSAGE.CANNOT_BE_BLANK('avatar'))
    } else {
        showSuccess(avatarEl);
        valid = true;
    }
    return valid;
}

const checkTopic = () => {
    let valid = false;
    const min = 0,
    max = 100;
    const topic = topicEl.value.trim();

    if (!isRequired(topic)) {
        showError(topicEl, MESSAGE.CANNOT_BE_BLANK('topic'));
    } else if (!isBetween(topic.length, min, max)) {
        showError(topicEl, MESSAGE.LENGTH_IS_INVALID('topic', min, max))
    } else {
        showSuccess(topicEl);
        valid = true;
    }
    return valid;
}

const checkDate = () => {
    let valid = false;
    const date = dateEl.value.trim();
    if (!isRequired(date)) {
        showError(dateEl, MESSAGE.CANNOT_BE_BLANK('date'))
    } else {
        showSuccess(dateEl);
        valid = true;
    }
    return valid;
}

const checkLocation = () => {
    let valid = false;
    const min = 3,
    max = 100;
    const location = locationEl.value.trim();

    if (!isRequired(location)) {
        showError(locationEl, MESSAGE.CANNOT_BE_BLANK('location'));
    } else {
        showSuccess(locationEl);
        valid = true;
    }
    return valid;
}

const checkStartTime = () => {
    let valid = false;
    const fromtime = fromtimeEl.value.trim();

    if (!isRequired(fromtime)) {
        showError(fromtimeEl, MESSAGE.CANNOT_BE_BLANK('time start'));
    } else {
        showSuccess(fromtimeEl);
        valid = true;
    }
    return valid;
}

const checkEndTime = () => {
    let valid = false;
    const endtime = endtimeEl.value.trim();

    if (!isRequired(endtime)) {
        showError(endtimeEl, MESSAGE.CANNOT_BE_BLANK('time end'));
    } else {
        showSuccess(endtimeEl);
        valid = true;
    }
    return valid;
}

const checkNote = () => {
    let valid = false;
    let min = 0,
        max = 300;

    const note = noteEl.value.trim();

    if (!isBetween(note.length, min, max)) {
        showError(noteEl, MESSAGE.LENGTH_IS_INVALID('note', min, max))
    } else {
        showSuccess(noteEl)
        valid = true;
    }
    return valid;
}

export const validationFunctions = [
    checkUserName,
    checkAge,
    checkAvatar,
    checkTopic,
    checkDate,
    checkLocation,
    checkStartTime,
    checkEndTime,
    checkNote
];

export const fieldHandlers  = {
    name: checkUserName, 
    age: checkAge,
    avatar: checkAvatar,
    topic: checkTopic,
    date: checkDate,
    location: checkLocation,
    fromtime: checkStartTime,
    endtime: checkEndTime,
    note: checkNote    
}