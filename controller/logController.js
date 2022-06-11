const Animal = require('../models/animals')

const newLog = (req,res)=>{
    Animal.findById(req.params.animalId, (err, a)=>{
        a.logs.unshift(req.body);
        a.save((err)=>{
            res.redirect(`/animals/${a._id}`);
        })
    })
}

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

module.exports = {
    newLog,
    deleteLog,
}