const mongoose =require('../config/connect.js')
const express=require('express')
const router = express.Router()

const formulaireController = require('../Controller/FormulaireC');


router.post('/formulaire', formulaireController.addForm
  
);


router.get('/formulaire/:id', formulaireController.getById);


router.put('/formulaire/:id', formulaireController.updateForm);


router.delete('/formulaire/:id', formulaireController.deleteForm);

module.exports = router;
