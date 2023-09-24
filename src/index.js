// selecting main content
const meetups = document.querySelector('.meetups');
const create_Meetup = document.querySelector('.create-meetup');

// selecting meetup cards wrapper
const wrap_cards = meetups.querySelector('.wrap-topic-cards')

// selecting form and its elements
const form_meetup = create_Meetup.querySelector('.form-meetup');
const userNameEl = form_meetup.querySelector('#name')
const ageEl = form_meetup.querySelector('#age')
const topicEl = form_meetup.querySelector('#topic')
const avatarEl = form_meetup.querySelector('#avatar')
const dateEl = form_meetup.querySelector('#date')
const locationEl = form_meetup.querySelector('#location')
const fromtimeEl = form_meetup.querySelector('#fromtime')
const endtimeEl = form_meetup.querySelector('#endtime')
const noteEl = form_meetup.querySelector('#note')

// selecting buttons 
const btn_create = meetups.querySelector('.btn-create');
const btn_close = create_Meetup.querySelector('.wrap-form .btn-close')
const button_submit = form_meetup.querySelector(".btn-submit")

// function to check if inputs is required
const isRequired = (value) => value === '' ? false : true;
// function to check if the length is between a specified minimun and maximun value
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// show error signal if inputs are invalid
const showError = (input, message) => {
    const group_form = input.parentNode;

    group_form.classList.remove('success');
    group_form.classList.add('error');

    const error = group_form.querySelector('small');
    error.textContent = message
}
// show success signal if inputs are valid
const showSuccess = (input) => {
    const group_form = input.parentElement;

    group_form.classList.remove('error');
    group_form.classList.add('success');

    const error = group_form.querySelector('small');
    error.textContent = '';
}

// functions to check inputs form are valid or not 
const checkUserName = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const userName = userNameEl.value.trim();

    if (!isRequired(userName)) {
        showError(userNameEl, 'Username cannot be blank.');
    } else if (!isBetween(userName.length, min, max)) {
        showError(userNameEl, `Username must be between ${min} and ${max} characters.`)
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
        showError(ageEl, 'Age cannot be blank.');
    } else if (isNaN(age)) {
        showError(ageEl, 'Age must be an number');
    } else if (!Number.isInteger(parseFloat(age))) {
        showError(ageEl, 'Age must be an integer');
    } else if (!isBetween(parseFloat(age), min, max)) {
        showError(ageEl, `Age must be between ${min} and ${max}`);
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
        showError(avatarEl, 'Avatar cannot be blank')
    } else {
        showSuccess(avatarEl);
        valid = true;
    }
    return valid;
}

const checkTopic = () => {
    let valid = false;
    const min = 0;
    max = 100;
    const topic = topicEl.value.trim();

    if (!isRequired(topic)) {
        showError(topicEl, 'Topic cannot be blank.');
    } else if (!isBetween(topic.length, min, max)) {
        showError(topicEl, `Topic must be less than ${max} characters`)
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
        showError(dateEl, 'Date cannot be blank')
    } else {
        showSuccess(dateEl);
        valid = true;
    }
    return valid;
}

const checkLocation = () => {
    let valid = false;
    const min = 3;
    max = 100;
    const location = locationEl.value.trim();

    if (!isRequired(location)) {
        showError(locationEl, 'Location cannot be blank.');
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
        showError(fromtimeEl, 'Time Start cannot be blank.');
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
        showError(endtimeEl, 'Time End cannot be blank.');
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
        showError(noteEl, `Note must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(noteEl)
        valid = true;
    }
    return valid;
}

// API address that contains database
let meetupsApi = 'https://65041734c8869921ae247e4d.mockapi.io/meetups/meetups';


/* ---------EVENTS LISTENER--------------------------------------------------------------*/
// render topic cards when load page
getMeetups().then(renderMeetups)
// close form when click button close
btn_close.addEventListener('click', closeForm)
// close form when click outside form
create_Meetup.querySelector(".background").addEventListener('click', (event) => {
    const self = event.target.closest('.wrap-form');
    if (!self) closeForm();
})
// open the form when click button create 
btn_create.addEventListener('click', openForm);
// submit form meetup when click submit button
form_meetup.addEventListener('submit', submit_Form)
// delete or editing a meetup when click button delete or edit 
wrap_cards.addEventListener('click', (event) => {
    if (event.target.matches('.btn-delete')) {
        const card = event.target.parentNode.parentNode;
        const card_Id = card.getAttribute("id").slice(11);

        deleteMeetup(card_Id).then(card.remove());
    }

    if (event.target.classList.contains('btn-edit')) {
        const card = event.target.parentNode.parentNode;
        const card_Id = card.getAttribute("id").slice(11);
        openEditMeetup();
        getMeetups(card_Id)
            .then(pushDataIntoMeetup)
    }
})
// check inputs valid or invalid (while typing) before submit 
form_meetup.addEventListener('input',debounce(function(event) {
    switch (event.target.id) {
        case 'name':
            checkUserName();
            break;
        case 'age':
            checkAge();
            break;
        case 'avatar':
            checkAvatar();
            break;
        case 'topic':
            checkTopic();
            break;
        case 'date':
            checkDate();
            break;
        case 'location':
            checkLocation();
            break;
        case 'fromtime':
            checkStartTime();
            break;
        case 'endtime':
            checkEndTime();
            break;
        case 'note':
            checkNote();
            break;   
    }
}))

/* -----------FETCH API-----------------------------------------------------*/
// getting data of meetup
async function getMeetups(id) {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    let url = meetupsApi;
    if (id !== undefined) url += '/' + id;
    const response = await fetch(url, option);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const dataMeetups = await response.json();
    return dataMeetups;
}

// posting data of meetup
async function postMeetup(data) {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    const response = await fetch(meetupsApi, option);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const dataMeetup = await response.json();
    return dataMeetup;
}

// delete data of a meetup 
async function deleteMeetup(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(meetupsApi + '/' + id, option);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    const dataMeetup = await response.json();
    return dataMeetup;
}

// editing data of a meetup 
async function editMeetup(data, id) {
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(meetupsApi + '/' + id, option);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const dataMeetup = await response.json();
    return dataMeetup;
}


/* -----------FUNCTIONS-----------------------------------------------------------*/
// render the tozpic cards with Data in db.json
function renderMeetups(meetups) {
    meetups.map(create_Topic_Card)
}

// push data from db.json to form edit 
function pushDataIntoMeetup(meetup) {
    const inputs = create_Meetup.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.value = meetup[input.name];
    })
}

// updata data of meetup card after editing
function updateMeetupCard(meetupObj) {
    const card_content = wrap_cards.querySelector(`#topic-card-${meetupObj.id} .wrap-content`);
    card_content.innerHTML = `
    <p class="content-title">date & time:<span class="content-text">${meetupObj.date} @ ${meetupObj.fromtime} - ${meetupObj.endtime}</span></p>
    <p class="content-title">guest speaker:<span class="content-text">${meetupObj.name}</span></p>
    <p class="content-title">twitter address:<a href="https://twitter.com/${meetupObj.twitter}" class="content-text">@${meetupObj.twitter}</a></p>
    <p class="content-title">topic:<span class="content-text">${meetupObj.topic}</span></p>`

    if (meetupObj.twitter === "") {
        wrap_cards.querySelector(`#topic-card-${meetupObj.id} .content-title:nth-child(3)`).classList.add("hidden");
    }
}

// check and submit form
function submit_Form(event) {
    event.preventDefault();
    displayLoading();
    let isUserNameValid = checkUserName(),
        isAgeValid = checkAge(),
        isAvatarValid = checkAvatar(),
        isTopicValid = checkTopic(),
        isDataValid = checkDate(),
        isLocationValid = checkLocation(),
        isStartTimeValid = checkStartTime(),
        isEndTimeValid = checkEndTime(),
        isNoteValid = checkNote();
    
    let isFormValid = isUserNameValid &&
        isAgeValid &&
        isAvatarValid &&
        isTopicValid &&
        isDataValid &&
        isLocationValid &&
        isStartTimeValid &&
        isEndTimeValid &&
        isNoteValid;

    if (isFormValid) {
        const card_Id = form_meetup.querySelector('.meetup-id').value;
        
            const formDataObj = {};
            const inputs = form_meetup.querySelectorAll('.form-control');
            inputs.forEach((input) => {
                formDataObj[input.name] = input.value;
            })
            if (!card_Id) {
                postMeetup(formDataObj)
                .then(create_Topic_Card)
                .then(() => hideLoading())
                .then(() => setTimeout(() => {
                    alert('Success!');
                    closeForm();
                }, 1000));
            }
            else {
                editMeetup(formDataObj, card_Id)
                    .then(() => getMeetups(card_Id))
                    .then(updateMeetupCard)
                    .then(() => hideLoading())
                    .then(() => setTimeout(() => {
                        alert('Success!');
                        closeForm();
                    }, 1000));
            }
    }
}

function debounce(fn, ms) {
	let timer;
	
	return function() {
		const args = arguments;
		const context = this;
		
		if(timer) clearTimeout(timer);
		
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, ms)
	}
}

// create Topic Card 
function create_Topic_Card(meetupObj) {
    const card = document.createElement('div');

    card.classList = "topic-card";
    card.setAttribute("id", `topic-card-${meetupObj.id}`);
    wrap_cards.appendChild(card);

    card.innerHTML = `
        <div class="wrap-image">
            <img class="image" src="${meetupObj.avatar}" alt="">
        </div>

        <div class="wrap-heading">
            <h2 class="heading">meetup</h2>
            <h3 class="sub-heading"><span class="bar">-</span>Hybrid<span class="bar">-</span></h3>
        </div>

        <div class="wrap-content">
            <p class="content-title">date & time:<span class="content-text">${meetupObj.date} @ ${meetupObj.fromtime} - ${meetupObj.endtime}</span></p>
            <p class="content-title">guest speaker:<span class="content-text">${meetupObj.name}</span></p>
            <p class="content-title">twitter address:<a href="https://twitter.com/${meetupObj.twitter}" class="content-text">@${meetupObj.twitter}</a></p>
            <p class="content-title">topic:<span class="content-text">${meetupObj.topic}</span></p>  
        </div>
        <div class="wrap-button">
            <div class="btn-edit btn-edit-${meetupObj.id}">Edit</div>
            <div class="btn-delete btn-delete-${meetupObj.id}">Delete</div>
        </div>
    `
    // check if do not have twitter data, hidden twitter in topic card  
    if (meetupObj.twitter === "") {
        wrap_cards.querySelector(`#topic-card-${meetupObj.id} .content-title:nth-child(3)`).classList.add("hidden");
    }
}

// open a creating form
function openForm() {
    button_submit.textContent = "Create"
    create_Meetup.classList.remove("hidden");
}

// open a editing form
function openEditMeetup() {
    button_submit.textContent = "Save"
    form_meetup.querySelector('.form-title').textContent = "Meetup"
    create_Meetup.classList.remove("hidden");
}

// close a form
function closeForm() {
    const form_controls = form_meetup.querySelectorAll('.form-control');
    form_controls.forEach((input) => {
        const group_form = input.parentNode;
        const error = group_form.querySelector('small');
        error.textContent = '';
        if (group_form.classList.contains('error')) group_form.classList.remove('error');
        if (group_form.classList.contains('success')) group_form.classList.remove('success');
    })
    form_meetup.reset()
    create_Meetup.classList.add("hidden");
}

// loading indicator when click submit button
const loader = form_meetup.querySelector(".form-meetup .loader");

function displayLoading() {
    loader.classList.remove('hidden');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
}
function hideLoading() {
    loader.classList.add('hidden');
}

// loading indicator when load a page
window.addEventListener('load', () => {
    const loader = meetups.querySelector('.loader');
    loader.classList.add("hidden-loader");
})