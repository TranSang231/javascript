const buttons = document.getElementsByClassName('btn-delete') 

// Remove A Book
Array.from(buttons).forEach(element => {
    element.addEventListener('click', function (event) {
        const book = event.target.parentNode
        book.remove()
    })
})
