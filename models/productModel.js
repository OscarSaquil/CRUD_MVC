// models/productModel.js
const db = require('../config/bd');

class Product {
  // Recupera todos los productos
  static async fetchAll() {
    const [rows] = await db.query('SELECT * FROM productos');
    return rows;
  }

  // Recupera un producto por su ID
  static async fetchById(id) {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  }

  // Crea un nuevo producto
  static async create({ codigo, nombre, descripcion, precio, stock }) {
    const [result] = await db.query(
      `INSERT INTO productos (codigo, nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)`,
      [codigo,nombre, descripcion, precio, stock]
    );
    return result.insertId; // ID del nuevo registro
  }

  // Actualiza un producto existente
  static async updateById(id, { codigo, nombre, descripcion, precio, stock }) {
    await db.query(
      `UPDATE productos 
       SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, stock = ? 
       WHERE id = ?`,
      [codigo, nombre, descripcion, precio, stock, id]
    );
  }

  // Elimina un producto por su ID
  static async deleteById(id) {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
  }
  
  static async buscarProductos(filtro) {
    const term = `%${filtro.trim()}%`;
    const [rows] = await db.query(
      `SELECT * FROM productos
       WHERE LOWER(codigo) LIKE LOWER(?) 
          OR LOWER(nombre) LIKE LOWER(?) 
          OR LOWER(COALESCE(descripcion, '')) LIKE LOWER(?)
       ORDER BY nombre ASC`,
      [term, term, term]
    );
    return rows;
  }
  static async obtenerTodosLosProductos() {
    const [rows] = await bd.query(`
      SELECT id, codigo, nombre, descripcion, precio, cantidad, creado, actualizado
      FROM productos
      ORDER BY nombre ASC
    `);
    return rows;
  }
  
};


module.exports = Product;
