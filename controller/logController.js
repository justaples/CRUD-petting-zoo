const Animal = require('../models/animals')

const newLog = (req,res)=>{
    Animal.findById(req.params.animalId, (err, a)=>{
        a.logs.push(req.body);
        a.save((err)=>{
            res.redirect(`/animals/${a._id}`);
        })
    })
}

const deleteLog = (req,res)=>{
    Animal.findById(req.params.animalId, (err,a)=>{
        a.logs.id(req.params.logId).remove()
        a.save((err)=>{
            if(err){
                res.status(400).json(err)
                return
            }
        })
        res.redirect(`/animals/${req.params.animalId}`)
    })
}


module.exports = {
    newLog,
    deleteLog
}