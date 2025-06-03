// controllers/productController.js
const Product = require('../models/productModel');

// Muestra el listado de productos
exports.getIndex = async (req, res) => {
  try {
    const productos = await Product.fetchAll();
    res.render('index', { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener productos');
  }
};

// Muestra el formulario para crear un producto
exports.getCreate = (req, res) => {
  res.render('nuevo');
};

// Procesa el formulario de creación
exports.postCreate = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    await Product.create({ nombre, descripcion, precio, stock });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear producto');
  }
};

// Muestra el formulario para editar un producto
exports.getEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Product.fetchById(id);
    if (!producto) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('editar', { producto });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener producto para editar');
  }
};

// Procesa el formulario de edición
exports.postEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const { codigo, nombre, descripcion, precio, stock } = req.body;
    await Product.updateById(id, { codigo, nombre, descripcion, precio, stock });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    console.error('Error real:', err);
    res.status(500).send('Error al actualizar producto');
  }
};

// Elimina un producto
exports.getDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteById(id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar producto');
  }
};


exports.prueba = (req, res) => {
    res.render('prueba');
  }