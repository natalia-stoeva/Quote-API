const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const apiRouter = express.Router()
app.use('/api/quotes', apiRouter)

apiRouter.get('/random', (req, res, next) => { 
    //convert the answer to an object required by the front-end
    const randomQuote = {
        quote: getRandomElement(quotes)
    }   
    res.send(randomQuote)
});

//doesn't work with lower case
apiRouter.get('/', (req, res, next) => {
    const person = req.query.person    
    let findQuotes = quotes.filter(quote => quote.person === person);

    if(person){
        const quotesByPerson = {
            quotes: findQuotes
        }
        res.send(quotesByPerson)
    } else {
        const allQuotes = {
            quotes: quotes
        }
        res.send(allQuotes)
    }
});

apiRouter.post('/', (req, res, next) => {
    const addQuote = req.query.quote
    const addPerson = req.query.person

    if(addQuote && addPerson){
        res.status(201).send({
            quote:{
                quote: addQuote,
                person: addPerson
            }
        })
    } else {
        res.status(400).send()
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});




