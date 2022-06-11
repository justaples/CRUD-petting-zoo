const express = require('express');
const app = express();   
// const PORT = process.env.PORT || 3000;
// const multer = require('multer')
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const animalRoutes = require('./routes/animalRoutes')
const logRoutes = require('./routes/logRoutes')
const Animal = require('./models/animals')

require('dotenv').config({path:__dirname+'/.env'});
require('./db/connection')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(morgan('tiny'));
app.use('/animals', animalRoutes);
app.use('/', logRoutes);

// app.listen(PORT, () => {
//     console.log(`✅ PORT: ${PORT} 🌟`);
// })

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });