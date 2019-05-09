const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')
const micButton = document.querySelector('#btnMic');
// let p = document.createElement('p');
// const words = document.querySelector('.words');
// words.appendChild(p);
const input = document.querySelector('.inputValue');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var speechRecognition = new SpeechRecognition();

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value
    if (micButton.disabled) {
        micButton.disabled = false;
    }
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    getWeather(location);
})

micButton.addEventListener('click', function (event) {
    event.preventDefault();
    micButton.disabled = true;

    speechRecognition.interimResults = true;
    speechRecognition.addEventListener('result', e => {
      //  console.log(e);
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
       // console.log(transcript)

        input.value = transcript;
    })

    speechRecognition.addEventListener('end', speechRecognition.start)
    speechRecognition.start();
}, false);

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