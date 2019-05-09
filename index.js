const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const quotesDb = {
  'd9424e04-9df6-4b76-86cc-9069ca8ee4bb': {
    id: 'd9424e04-9df6-4b76-86cc-9069ca8ee4bb',
    quote: 'It’s not a bug. It’s an undocumented feature!',
  },
  '27b03e95-27d3-4ad1-9781-f4556c1dee3e': {
    id: '27b03e95-27d3-4ad1-9781-f4556c1dee3e',
    quote:
      'Software Developer” – An organism that turns caffeine into software',
  },
  '5b2cdbcb-7b77-4b23-939f-5096300e1100': {
    id: '5b2cdbcb-7b77-4b23-939f-5096300e1100',
    quote:
      'If debugging is the process of removing software bugs, then programming must be the process of putting them in',
  },
  '917d445c-e8ae-4ed9-8609-4bf305de8ba8': {
    id: '917d445c-e8ae-4ed9-8609-4bf305de8ba8',
    quote:
      'A user interface is like a joke. If you have to explain it, it’s not that good.',
  },
  '4ad11feb-a76a-42ae-a1c6-8e30dc12c3fe': {
    id: '4ad11feb-a76a-42ae-a1c6-8e30dc12c3fe',
    quote: 'If at first you don’t succeed; call it version 1.0',
  },
};

const quoteComments = {
  '70fcf8bd-6cb0-42f3-9887-77aa9db4f0ac': {
    id: '70fcf8bd-6cb0-42f3-9887-77aa9db4f0ac',
    comment: 'So awesome comment!',
    quoteId: 'd9424e04-9df6-4b76-86cc-9069ca8ee4bb',
  },
};
const users = {
  'eb849b1f-4642-4c16-a77b-71ac2f90996f': {
    id: 'eb849b1f-4642-4c16-a77b-71ac2f90996f',
    name: 'Kent Cook',
    email: 'really.kent.cook@kitchen.com',
    password: 'cookinglessons',
  },
  '1dc937ec-7d71-4f37-9560-eef9d998a9b7': {
    id: '1dc937ec-7d71-4f37-9560-eef9d998a9b7',
    name: 'Phil A. Mignon',
    email: 'good.philamignon@steak.com',
    password: 'meatlover',
  },
};

// Create a list of quotes with the matching comments
var getQuotes = quotes => {
  const outputObj = {};
  for (const quoteId in quotes) {
    // copy the content of the movieObj into outputObj
    outputObj[quoteId] = quotes[quoteId];
    // Add a new comments key that contains the array of comments
    outputObj[quoteId].comments = Object.values(quoteComments).filter(
      commentObj => commentObj.quoteId === quotes[quoteId].id
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

console.log(getQuotes(quotesDb));

app.get('/', (req, res) => res.status(301).redirect('/quotes'));

// Display a list of quotes
app.get('/quotes', (req, res) => {
  const templateVars = { quoteList: getQuotes(quotesDb) };
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
