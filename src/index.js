const create_Meetup = document.querySelector('.create-meetup');
const btn_create = document.querySelectorAll('.btn-create');
const btn_close = document.querySelector('.wrap-form .btn-close')

// Appear a form 
btn_create[0].addEventListener('click', openForm);
// Hide a form
btn_close.addEventListener('click', closeForm)

function openForm() {
    create_Meetup.classList.remove("hidden");
}

function closeForm() {
    const form_meetup = document.querySelector('.form-meetup');
    create_Meetup.classList.add("hidden");
    form_meetup.reset()
}

// Modal click outside
document.body.addEventListener('click', (event) => {
    const self = event.target.closest('.wrap-form');
    if (event.target == btn_create[0]) openForm();
    else if (!self) closeForm();
})

let meetupsApi = 'http://localhost:3000/meetups';

function start() {
    getMeetups().then(renderMeetups)
    handle_Create_Form()
}
start()

// getting data of meetup
async function getMeetups() {
    const respone = await fetch(meetupsApi);

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

    const dataMeetups = await response.json();
    return dataMeetups;
}

// render the topic cards with Data in db.json
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
    const btn_create = document.querySelector('.form-meetup .btn-create');

    btn_create.addEventListener('click', submit_Form)

    function submit_Form() {
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