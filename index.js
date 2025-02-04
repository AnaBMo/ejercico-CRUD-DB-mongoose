//! Servidor, conexión a la base de datos y resto de la aplicación.

const express = require('express');
const app = express();
const PORT = 3003;
const { dbConnection } = require('./config/config');
const routes = require('./routes/indexRoutes');

app.use(express.json());

app.use('/', routes);

dbConnection();



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));