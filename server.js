const express = require('express')
const app = express()

const { quotes } = require('./data')
const { getRandomElement } = require('./utils')

const PORT = process.env.PORT || 4001

app.use(express.static('public'))

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes).quote
  const responseObject = {quote: randomQuote}
  res.send(responseObject)
})

app.get('/api/quotes', (req, res, next) => {
  const person = req.query.person
  let responseObject = {}
  if (person) {
    // return quotes by person
    responseObject = {
      quotes: quotes.map(quote => {
        if (quote.person === person) { return quote.quote }
      }).filter(quote => {
        if (quote) { return true }
      })
    }
  } else {
    // return all quotes
    responseObject = {
      quotes: quotes.map(quote => {
        return quote.quote
      })
    }
  }
  res.send(responseObject)
})

app.post('/api/quotes', (req, res, next) => {
  const newPerson = req.query.person
  const newQuote = req.query.quote
  if (!newPerson || !newQuote) {
    res.status(400).send()
  } else {
    const newQuoteObject = { quote: newQuote, person: newPerson }
    quotes.push(newQuoteObject)
    console.log(`server returning object :${JSON.stringify(newQuoteObject)}.`)
    res.send(newQuoteObject)
  }
})

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`)
})
