const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const logCtrl = require('../controller/logController')



// Create: POST /animals/:animalsId/logs
router.post('/animals/:animalId/logs', logCtrl.newLog)
// Edit: GET /animals/:animalsId/logs/:logsId/edit
// router.get('/animals/:animalId/logs/:logId/editLog', logCtrl.editLog)
// Update: PUT /animals/:animalsId/logs/:logsId 
router.put('/animals/:animalId/logs/:logId', logCtrl.updateLog)
// Destroy: DELETE /animals/:animalsId/logs/:logsId 
router.delete('/animals/:animalId/logs/:logId', logCtrl.deleteLog)


module.exports = router