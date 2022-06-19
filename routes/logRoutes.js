const express = require('express')
const router = express.Router()
const logCtrl = require('../controller/logController')

/*=======================================================================
Log routes connected to the log controller file
=======================================================================*/

router.post('/animals/:animalId/logs', logCtrl.newLog)
router.delete('/animals/:animalId/logs/:logId', logCtrl.deleteLog)


module.exports = router