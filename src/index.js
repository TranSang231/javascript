const create_Meetup = document.querySelector('.create-meetup');
const wrap_cards = document.querySelector('.wrap-topic-cards')
const form_meetup = document.querySelector('.form-meetup');
const btn_create = document.querySelectorAll('.btn-create');
const btn_close = document.querySelector('.wrap-form .btn-close')
let meetupsApi = 'http://localhost:3000/meetups';

// close form
btn_close.addEventListener('click', closeForm)
// Modal click outside
document.querySelector(".background").addEventListener('click', (event) => {
    const self = event.target.closest('.wrap-form');
    if (!self) closeForm();
})

getMeetups().then(renderMeetups)

btn_create[0].addEventListener('click', openForm);
form_meetup.addEventListener('submit', submit_Form)

// delete and editing
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

// render the tozpic cards with Data in db.json
function renderMeetups(meetups) {
    meetups.map(create_Topic_Card)
}

function pushDataIntoMeetup(meetup) {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.value = meetup[input.name];
    })
}

function updateMeetupCard(meetupObj) {
    const card_content = document.querySelector(`#topic-card-${meetupObj.id} .wrap-content`);
    card_content.innerHTML = `
    <p class="content-title">date & time:<span class="content-text">${meetupObj.date} @ ${meetupObj.fromtime} - ${meetupObj.endtime}</span></p>
    <p class="content-title">guest speaker:<span class="content-text">${meetupObj.name}</span></p>
    <p class="content-title">twitter address:<span class="content-text">${meetupObj.twitter}</span p>
    <p class="content-title">topic:<span class="content-text">${meetupObj.topic}</span></p>`
}

function submit_Form(event) {
    event.preventDefault();
    const card_Id = document.querySelector('.edit-id').value;

    const formDataObj = {};
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach((input) => {
        formDataObj[input.name] = input.value;
    })
    if (!card_Id) {
        postMeetup(formDataObj)
            .then(create_Topic_Card)
            .then(closeForm);
    }
    else {
        editMeetup(formDataObj, card_Id)
            .then(() => getMeetups(card_Id))
            .then(updateMeetupCard)
            .then(closeForm)
    }
}

// create Topic Card 
function create_Topic_Card(meetupObj) {
    const wrap_cards = document.querySelector('.wrap-topic-cards');
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
            <p class="content-title">twitter address:<a class="content-text" href="http://twitter.com/${meetupObj.twitter}">@${meetupObj.twitter}</a></p>
            <p class="content-title">topic:<span class="content-text">${meetupObj.topic}</span></p>  
        </div>
        <div class="wrap-button">
            <div class="btn-edit btn-edit-${meetupObj.id}">Edit</div>
            <div class="btn-delete btn-delete-${meetupObj.id}">Delete</div>
        </div>
    `
    // check if do not have twitter data, hidden twitter in topic card  
    if (meetupObj.twitter === "") {
        document.querySelector(`#topic-card-${meetupObj.id} .content-title:nth-child(3)`).classList.add("hidden");
    }
}

function openForm() {
    const button = document.querySelector(".wrap-form .btn-create")
    button.textContent = "Create"
    create_Meetup.classList.remove("hidden");
}

function openEditMeetup() {
    const button = document.querySelector(".wrap-form .btn-create")
    button.textContent = "Save"
    document.querySelector('.form-title').textContent = "Meetup"
    create_Meetup.classList.remove("hidden");
}

function closeForm() {
    const form_meetup = document.querySelector('.form-meetup');
    form_meetup.reset()
    create_Meetup.classList.add("hidden");
}