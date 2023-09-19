const create_Meetup = document.querySelector('.create-meetup');
const btn_create = document.querySelectorAll('.btn-create');
const btn_close = document.querySelector('.wrap-form .btn-close')

// Appear a form 
btn_create[0].addEventListener('click', openForm);
// Hide a form
btn_close.addEventListener('click', closeForm)

function openForm() {
    const btn_submit = document.querySelector('.wrap-form .btn-create');
    btn_submit.classList.remove("hidden")
    create_Meetup.classList.remove("hidden");
}

function openEditMeetup() {
    document.querySelector('.form-title').textContent = "Meetup"
    const btn_save = document.querySelector('.wrap-form .btn-save');
    btn_save.classList.remove("hidden")
    create_Meetup.classList.remove("hidden");
}

function closeForm() {
    const form_meetup = document.querySelector('.form-meetup');
    const btn_submit = document.querySelector('.wrap-form .btn-create');
    const btn_save = document.querySelector('.wrap-form .btn-save');

    if (!btn_submit.classList.contains("hidden")) {
        btn_submit.classList.add("hidden");
    }

    if (!btn_save.classList.contains("hidden")) {
        btn_save.classList.add("hidden");
    }

    form_meetup.reset()
    create_Meetup.classList.add("hidden");
}

// Modal click outside
document.querySelector(".background").addEventListener('click', (event) => {
    const self = event.target.closest('.wrap-form');
    if (!self) closeForm();
})

let meetupsApi = 'http://localhost:3000/meetups';

function start() {
    getMeetups().then(renderMeetups)
    handle_Create_Form()
    handle_Delete_Meetup()
    handle_Edit_Meetup()
}
start()

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
    const respone = await fetch(url, option);

    if (!respone.ok) {
        const message = `An error has occured: ${respone.status}`;
        throw new Error(message);
    }

    const dataMeetups = await respone.json();
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
    const respone = await fetch(meetupsApi + '/' + id, option);

    if (!respone.ok) {
        const message = `An error has occured: ${respone.status}`;
        throw new Error(message);
    }

    const dataMeetup = respone.json();
    return dataMeetup;
}

// render the tozpic cards with Data in db.json
function renderMeetups(meetups) {
    meetups.map(create_Topic_Card)
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
            <p class="content-title">twitter address:<span class="content-text">${meetupObj.twitter}</span p>
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

// Submit Form - Get Data of Meetup - Create A Topic Card 
function handle_Create_Form() {
    const btn_submit = document.querySelector('.form-meetup .btn-create');

    // btn_submit.addEventListener('click', submit_Form)
    const form_meetup = document.querySelector('.form-meetup');
    
    form_meetup.addEventListener('submit', submit_Form)      

    function submit_Form(event) {
        event.preventDefault();

        const formDataObj = {};
        const inputs = document.querySelectorAll('.form-control');
            inputs.forEach((input) => {
                formDataObj[input.name] = input.value;
            })
    
            postMeetup(formDataObj)
                .then(create_Topic_Card)
                .then(closeForm);
        }

}

// delete Meetup (delete data in db.json and delete UI topic card)
function handle_Delete_Meetup() {
    const wrap_cards = document.querySelector('.wrap-topic-cards')

    wrap_cards.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            const card = event.target.parentNode.parentNode;
            const card_Id = card.getAttribute("id").slice(11);

            deleteMeetup(card_Id).then(card.remove());
        }
    })
}   

function handle_Edit_Meetup() {
    const wrap_cards = document.querySelector('.wrap-topic-cards');

    wrap_cards.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-edit')) {
            const card = event.target.parentNode.parentNode;
            const card_Id = card.getAttribute("id").slice(11);
            getMeetups(card_Id)
                .then(showEditMeetup)
                .then(updateMeetup)
                .then(closeForm()); 
        }
    })
}

function showEditMeetup(meetup) {
    openEditMeetup()

    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.value = meetup[input.name];
    })
    return meetup.id;
}

function updateMeetup(id) {
    const btn_save = document.querySelector('.form-meetup .btn-save');
    const form_meetup = document.querySelector('.form-meetup')
    form_meetup.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-save')) {
            const formDataObj = {};
            const inputs = document.querySelectorAll('.form-control');
            inputs.forEach(input => {
                formDataObj[input.name] = input.value;
            })

            editMeetup(formDataObj, id)
        }
    })
}