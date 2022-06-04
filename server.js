const express = require('express');
const app = express();   
const PORT = 3000;
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
//const animalRoutes = require('')
//const Animal = require('')

require('./db/connection')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(morgan('tiny'));
// app.use('/animals', animalRoutes);

app.listen(PORT, () => {
    console.log(`✅ PORT: ${PORT} 🌟`);
})