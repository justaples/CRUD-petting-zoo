const express = require('express')
const router = express.Router()
const logCtrl = require('../controller/logController')



// Create: POST /animals/:animalsId/logs
router.post('/animals/:animalId/logs', logCtrl.newLog)
// Edit: GET /animals/:animalsId/logs/:logsId/edit
// Update: PUT /animals/:animalsId/logs/:logsId 
// Destroy: DELETE /animals/:animalsId/logs/:logsId 
router.delete('/animals/:animalId/logs/:logId', logCtrl.deleteLog)


module.exports = router