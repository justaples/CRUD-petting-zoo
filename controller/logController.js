const Animal = require('../models/animals')

/*=======================================================================
Following function adds a log to an animal 
Unshift was used so logs are displayed on top
=======================================================================*/
const newLog = (req,res)=>{
    Animal.findById(req.params.animalId, (err, a)=>{
        a.logs.unshift(req.body);
        a.save((err)=>{
            res.redirect(`/animals/${a._id}`);
        })
    })
}

/*=======================================================================
Following function deletes a specific log 
=======================================================================*/
const deleteLog = (req,res)=>{
    Animal.findById(req.params.animalId, (err,a)=>{
        try{
            a.logs.id(req.params.logId).remove()
            a.save((err)=>{
                if(err){
                    res.status(400).json(err)
                    return
                }
            })
            res.redirect(`/animals/${req.params.animalId}`)
        } catch(err){
            console.log(err)
        }
    })
}

/*=======================================================================
Exporting functions
=======================================================================*/
module.exports = {
    newLog,
    deleteLog,
}