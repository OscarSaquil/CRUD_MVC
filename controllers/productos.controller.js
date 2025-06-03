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
    const { codigo, nombre, descripcion, precio, stock } = req.body;
    await Product.create({ codigo, nombre, descripcion, precio, stock });
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


async function buscarProductosJSON(req, res) {
  try {
    const filtro = req.query.busqueda || '';
    const lista = await Product.buscarProductos(filtro);
    res.json({ success: true, data: lista });
  } catch (err) {
    console.error('Error en buscarProductosJSON:', err);
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al consultar los productos.'
    });
  }
}
exports.buscarProductosJSON = buscarProductosJSON;
async function verListadoProductos(req, res) {
  try {
    // Opcional: podemos decidir si al cargar la página con req.query.busqueda ya llama al modelo
    // o simplemente cargamos la página vacía y el front hará fetch de inmediato.
    // Para este ejemplo, cargamos la vista con un arreglo vacío; el front pedirá los datos.
    res.render('index', {
      titulo: 'Listado de Productos',
      // Si quieres, al cargar la página puedes enviar todos los productos:
      // productos: await productoModel.obtenerTodosLosProductos()
      productos: [await productModel.obtenerTodosLosProductos()] 
    });
  } catch (err) {
    console.error('Error en verListadoProductos:', err);
    res.status(500).send('Ocurrió un error al cargar la página de productos.');
  }
}
exports.verListadoProductos = verListadoProductos;


exports.prueba = (req, res) => {
    res.render('prueba');
  }