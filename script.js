// theres a free api called api.quotable.io
// api.quotable.io/random


//fetch API --> learn about this?
// theres a video on this in the youtube description
const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const button = document.getElementById('pauseButton');


quoteInputElement.addEventListener('input', () => {
    if (buttonClicked == 0) {
        resume()
    }
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })
    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = '' // inner texts targets the text
    quote.split('').forEach(character => { // splits the quote into html <span> elements, so that each span can be coloured
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character 
        quoteDisplayElement.appendChild(characterSpan) 
    })
    quoteInputElement.value = null
    startTimer()
}

let buttonClicked = 1
let startTime;
let elapsedTime = 0;
let timerInterval;

button.addEventListener('click', () => {
    if (buttonClicked === 1) {
        // Pause
        buttonClicked = 0;
        button.innerText = "Continue Typing To Resume";
        elapsedTime += new Date() - startTime;
        clearInterval(timerInterval);
    } else {
        // Resume
        resume()
        
    }
});
function resume() {
    buttonClicked = 1;
    button.innerText = "Pause";
    startTime = new Date();
    runTimer();
}

function runTimer() {
    timerInterval = setInterval(() => {
        const total = elapsedTime + (new Date() - startTime);
        timerElement.innerText = Math.floor(total / 1000);
    }, 1000);
}

function startTimer() {
    startTime = new Date();
    elapsedTime = 0;
    runTimer();
}



// Get a quote on page load
renderNewQuote();


// doesn't work because the quote API is old and the site is not secure :(
