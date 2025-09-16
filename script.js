// theres a free api called api.quotable.io
// api.quotable.io/random


//fetch API --> learn about this?

const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote()
    console.log(quote)
}
// doesn't work because the quote API is old and the site is not secure :(
getNextQuote()