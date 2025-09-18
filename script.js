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
    if (!isRunning) {
        start();
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
    reset();
    start();
}


let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
//0 is paused, 1 is running
button.addEventListener('click', () => {
    if (isRunning) {
        // Pause
        stop();
        button.innerText = "Continue Typing To Resume"
    } else {
        // Resume
        start();
        button.innerText = "Pause"
        
    }
});

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 1000);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}


function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let seconds = Math.floor(elapsedTime / 1000);
    timerElement.innerText = seconds;
}


// Get a quote on page load
renderNewQuote();


// doesn't work because the quote API is old and the site is not secure :(
