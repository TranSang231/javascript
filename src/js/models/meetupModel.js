// API address that contains database
let meetupsApi = 'https://65041734c8869921ae247e4d.mockapi.io/meetups/meetups';

/* -----------FETCH API-----------------------------------------------------*/
// getting data of meetup
export async function getMeetups(id) {
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
export async function postMeetupData(data) {
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
export async function deleteMeetupData(id) {
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
export async function editMeetupData(data, id) {
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
