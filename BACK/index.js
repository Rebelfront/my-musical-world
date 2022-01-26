require('dotenv').config();
const express = require('express');
const router = require('./app/router');

const app = express();

const port = process.env.PORT || 5050;

// on importe le module cors
const cors = require('cors');
//on met à jour les options de notre module cors
const corsOptions = {
  exposedHeaders: `Authorization`,
};
// et on l'applique dans un middleware pour autoriser tous les domaines à se connecter à notre API
// app.use(cors('*'));
app.use(cors(corsOptions));

app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

