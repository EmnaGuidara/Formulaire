const clientController = require('../Controller/ClientC');
const mongoose =require('../config/connect.js')
const express=require('express')
const router = express.Router()

router.post('/client', clientController.addClient);

router.get('/client/get/:id', clientController.getClient);
router.get('/client/Key/:referalUrl', clientController.getClientKey);

router.get('/client/getForms/:id', clientController.getClientAndForms);

router.put('/client/:id', clientController.updateClient);
router.put('/client/Key/:id', clientController.updateClientKey);

router.delete('/client/:id', clientController.deleteClient);

module.exports = router;