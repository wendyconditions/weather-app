const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    getWeather(location);
})

function getWeather(location) {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data);
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}