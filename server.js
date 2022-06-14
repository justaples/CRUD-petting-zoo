const express = require('express');
const app = express();   
const PORT = process.env.PORT || 8080;
// const multer = require('multer')
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const oauthRoutes = require('./routes/oauth');
const animalRoutes = require('./routes/animalRoutes')
const logRoutes = require('./routes/logRoutes')
const Animal = require('./models/animals')
const session = require('express-session')
const passport = require('passport')
// const cookieParser = require('cookie-parser')

require('dotenv').config({path:__dirname+'/.env'});
require('./db/connection')
require('./db/passport');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
// app.use(express.json())
// app.use(cookieParser())

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
    secret: 'SEIRocks!',
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res)=>{

    res.render('animals/home')
    res.redirect('/')
})

// app.get('/', (req,res)=>{
//     res.redirect('/animals')
// })

app.use(morgan('tiny'));

app.use('/', oauthRoutes);
app.use('/animals', animalRoutes);
app.use('/', logRoutes);


app.listen(PORT, () => {
    console.log(`✅ PORT: ${PORT} 🌟`);
})

