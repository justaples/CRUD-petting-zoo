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

const editLog = (req,res)=>{
//    Animal.findById(req.params.animalId, (err,a)=>{
//        a.logs.id(req.params.logId, (err,l)=>{
//         res.render('animals/editLog', {logs:l, id:req.params.logId})
//        })
//    }) 
}

const updateLog = (req,res) =>{
    // Animal.findById(req.params.animalId, (err,a)=>{
    //     a.logs.id(req.params.logId).entry = req.body.entry
    // })
}

module.exports = {
    newLog,
    deleteLog,
    editLog,
    updateLog
}