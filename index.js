const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const movieQuotesDb = {
  d9424e04: {
    id: 'd9424e04',
    quote: 'Why so serious?',
  },
  '27b03e95': {
    id: '27b03e95',
    quote: 'YOU SHALL NOT PASS!',
  },
  '5b2cdbcb': {
    id: '5b2cdbcb',
    quote: "It's called a hustle, sweetheart.",
  },
  '917d445c': {
    id: '917d445c',
    quote: 'The greatest teacher, failure is.',
  },
  '4ad11feb': {
    id: '4ad11feb',
    quote: 'Speak Friend and Enter',
  },
};

const quoteComments = {
  '70fcf8bd': {
    id: '70fcf8bd',
    comment: 'So awesome comment!',
    quoteId: 'd9424e04',
  },
  '90jdh3jk': {
    id: '90jdh3jk',
    comment: 'Hey Bob!',
    quoteId: 'd9424e04',
  },
  '34hdf9er': {
    id: '90jdh3jk',
    comment: 'Hey Bob!',
    quoteId: '4ad11feb',
  },
};

// Create a list of quotes with the matching comments
var getMovieQuotes = () => {
  const outputObj = {};
  for (const movieId in movieQuotesDb) {
    // copy the content of the movieObj into outputObj
    outputObj[movieId] = movieQuotesDb[movieId];
    // Add a new comments key that contains the array of comments
    outputObj[movieId].comments = Object.values(quoteComments).filter(
      commentObj => commentObj.quoteId === movieQuotesDb[movieId].id
    );
  }
  return outputObj;
};

// Updating quote in movieQuotesDb
var updateQuote = (id, quote) => {
  if (movieQuotesDb[id]) {
    movieQuotesDb[id].quote = quote;
    return true;
  } else {
    return false;
  }
};

console.log(getMovieQuotes());

app.get('/', (req, res) => res.status(301).redirect('/quotes'));

// Display a list of quotes
app.get('/quotes', (req, res) => {
  const templateVars = { quoteList: getMovieQuotes() };
  res.render('quotes', templateVars);
});

// Display the form for one quote
app.get('/quotes/:id', (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  const templateVars = { quoteObj: movieQuotesDb[id] };
  res.render('quote_show', templateVars);
});

// Edit one quote
app.post('/quotes/:id', (req, res) => {
  const { id } = req.params;
  // req.body gets the content from a form submission
  // const quote = req.body.quote;
  const { quote } = req.body;

  if (updateQuote(id, quote)) {
    res.status(302).redirect('/quotes');
  } else {
    console.log('Error with update');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
