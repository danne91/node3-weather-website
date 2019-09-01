console.log("Matbuha")

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent= ''
messageTwo.textContent= ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //allow us to do whatever we want - and then refresh the browser
    const location = searchElement.value

    messageTwo.textContent= ''
    messageOne.textContent= 'Loading...'

    fetch('http://localhost:3000/weather?adress=' + location).then((response) => {
    response.json().then((data) => {
        
        if(data.error)
        {
            messageOne.textContent= data.error
            console.log(data.error)
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)

        }
    })
})
})