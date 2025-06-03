// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Permitir parseo de formularios URL-encoded (body-parser)
app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Cargar rutas de productos
const productRoutes = require('./routes/productos.router');
app.use('/', productRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
