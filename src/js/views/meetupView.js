const createMeetupForm = document.querySelector('.create-meetup');
const meetups = document.querySelector('.meetups');
const wrapCards = meetups.querySelector('.wrap-topic-cards')
const meetupForm = createMeetupForm.querySelector('.form-meetup');
const buttonSubmit = meetupForm.querySelector(".btn-submit")

// loading indicator when load a page
export const hideButtonLoadingMeetupCard = () => {
    const loader = meetups.querySelector('.loader');
    loader.classList.add("hidden-loader");
}

// display loading indicator when click submit button, edit button and delete button
export const displayButtonLoading = (element) => {
    let button = element;
    button.textContent = '';
    button.classList.add('btn-loading');
    button.setAttribute('disabled', '');
    button.setAttribute('style', "cursor: not-allowed; transform: none; opacity: 0.7");
    setTimeout(() => {
        hideButtonLoading(button);
    }, 3000);
}

// hiding loading indicator when click submit button, edit button and delete button
export const hideButtonLoading = (element) => {
    let button = element;
    if (button.classList.contains('btn-edit')) button.textContent = "Edit";
    else if (button.classList.contains('btn-delete')) button.textContent = 'Delete';
    else if (button.classList.contains('btn-submit')) button.textContent = 'Create';
    button.classList.remove('btn-loading');
    button.removeAttribute('disabled');
    button.removeAttribute('style', "cursor: pointer; transform: scale(1,1); opacity: 0.7");
}

// disabled button when fetch data
export const disabledSubmitButton = () =>  {
    buttonSubmit.setAttribute('disabled', '');
    buttonSubmit.setAttribute('style', "cursor: not-allowed; transform: none; opacity: 0.7");
}

// enabled button after fetch data
export const enabledSubmitButton = () => {
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.removeAttribute('style', "cursor: pointer; transform: scale(1,1); opacity: 0.7");
}

// open a creating form
export const openCreateForm = () => {
    buttonSubmit.textContent = "Create"
    createMeetupForm.classList.remove("hidden");
}

// open a editing form
export const openEditForm = () => {
    buttonSubmit.textContent = "Save"
    meetupForm.querySelector('.form-title').textContent = "Meetup"
    createMeetupForm.classList.remove("hidden");
}

// close a form
export const closeForm = () => {
    const formControls = meetupForm.querySelectorAll('.form-control');
    meetupForm.reset();
    formControls.forEach((input) => {
        const groupForm = input.parentNode;
        const error = groupForm.querySelector('small');
        error.textContent = '';
        if (groupForm.classList.contains('error')) groupForm.classList.remove('error');
        if (groupForm.classList.contains('success')) groupForm.classList.remove('success');
    })
    createMeetupForm.classList.add("hidden");
}

// create Topic Card 
export const createMeetupCard = (meetupObj) => {
    const card = document.createElement('div');

    card.classList = "topic-card";
    card.setAttribute("id", `topic-card-${meetupObj.id}`);
    wrapCards.appendChild(card);

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
            <p class="content-title">twitter address:<a href="https://twitter.com/${meetupObj.twitter}" class="content-text" target="_blank">@${meetupObj.twitter}</a></p>
            <p class="content-title">topic:<span class="content-text">${meetupObj.topic}</span></p>  
        </div>
        <div class="wrap-button">
            <div class="btn-edit btn-edit-${meetupObj.id}">Edit</div>
            <div class="btn-delete btn-delete-${meetupObj.id}">Delete</div>
        </div>
    `
    // check if do not have twitter data, hidden twitter in topic card  
    if (meetupObj.twitter === "") {
        wrapCards.querySelector(`#topic-card-${meetupObj.id} .content-title:nth-child(3)`).classList.add("hidden");
    }
}

// render the tozpic cards with Data in db.json
export const renderMeetupCards = (meetups) => {
    meetups.map(createMeetupCard)
}

// push data from db.json to form edit 
export const polulateFormWithData = (meetup) => {
    disabledSubmitButton();
    const inputs = createMeetupForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.value = meetup[input.name];
    })
}

// updata data of meetup card after editing
export const updateCardData = (meetupObj) => {
    const cardContent = wrapCards.querySelector(`#topic-card-${meetupObj.id} .wrap-content`);
    cardContent.innerHTML = `
    <p class="content-title">date & time:<span class="content-text">${meetupObj.date} @ ${meetupObj.fromtime} - ${meetupObj.endtime}</span></p>
    <p class="content-title">guest speaker:<span class="content-text">${meetupObj.name}</span></p>
    <p class="content-title">twitter address:<a href="https://twitter.com/${meetupObj.twitter}" class="content-text" target="_blank">@${meetupObj.twitter}</a></p>
    <p class="content-title">topic:<span class="content-text">${meetupObj.topic}</span></p>`

    if (meetupObj.twitter === "") {
        wrapCards.querySelector(`#topic-card-${meetupObj.id} .content-title:nth-child(3)`).classList.add("hidden");
    }
}
