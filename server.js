const express = require('express'); 
require('dotenv').config();
const formulaireRoutes = require('./Routes/FormulaireR');
const clientRoutes = require('./Routes/ClientR');
require('./config/connect')

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', formulaireRoutes);
app.use('/api', clientRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));