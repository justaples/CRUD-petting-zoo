const express = require('express');
const app = express();   
const PORT = 3000;
const multer = require('multer')
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
// const bootstrap = require('bootstrap') 
const animalRoutes = require('./routes/animalRoutes')
const logRoutes = require('./routes/logRoutes')
const Animal = require('./models/animals')

require('./db/connection')

const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname ))
    }
});
// reference - https://www.youtube.com/watch?v=9Qzmri1WaaE
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('myImage')

function checkFileType(file, cb){
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if (mimeType && extName){
        return cb(null, true)
    } else {
        cb('Error: Images only')
    }
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(morgan('tiny'));
app.use('/animals', animalRoutes);
app.use('/', logRoutes);


app.post('/upload', (req,res)=>{
    upload(req,res, (err)=>{
        if(err){
            res.render('newAnimal', {
                msg: err
            })
        }else{
            if(req.file == undefined){
                res.render("newAnimal", {
                    msg: 'Error: Please select a file!'
                })
            }else{
                res.render('index',{
                    msg: "File Uploaded!",
                    file: `uploads/${req.file.filename}`
                })
            }
        }
    })
})

app.listen(PORT, () => {
    console.log(`✅ PORT: ${PORT} 🌟`);
})