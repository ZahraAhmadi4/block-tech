const express = require('express');
const app = express();
const port = 3000;

const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
  layoutsDir: {__dirname}/'views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: {__dirname}/'views/partials'
}));

app.use(express.static('static'));

const fakeApi = () => {
  return [
    {
      name: 'James vane Elk',
      lane: ''
    },
    {
      name: 'Elise Kampen',
      lane: ''
    },    
    {
      name: 'Dion Vermeer',
      lane: ''
    },
  ]
}

app.get('/', (req, res) => {
  res.render('main',{layout: 'index', proPlayer: fakeApi()});
});






// The 404 page
app.use('*', (req, res) => {
  res.render('404')
  console.log('Page not found!')
})

//Starting the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


