// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productos.controller');

// Ruta principal: / -> lista de productos
router.get('/productos', productController.getIndex);

// prueba
router.get('/prueba', productController.prueba);

// Crear producto
router.get('/crear', productController.getCreate);
router.post('/crear', productController.postCreate);

// Editar producto
router.get('/editar/:id', productController.getEdit);
router.post('/editar/:id', productController.postEdit);

// Eliminar producto
router.get('/eliminar/:id', productController.getDelete);


router.get('/buscar', productController.buscarProductosJSON);
router.get('/', productController.verListadoProductos);

module.exports = router;
