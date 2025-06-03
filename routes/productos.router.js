// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productos.controller');

// Ruta principal: / -> lista de productos
router.get('/productos', productController.getIndex);

// prueba
router.get('/prueba', productController.prueba);

// Crear producto
router.get('/create', productController.getCreate);
router.post('/create', productController.postCreate);

// Editar producto
router.get('/edit/:id', productController.getEdit);
router.post('/edit/:id', productController.postEdit);

// Eliminar producto
router.get('/delete/:id', productController.getDelete);


router.get('/buscar', productController.buscarProductosJSON);
router.get('/', productController.verListadoProductos);

module.exports = router;
