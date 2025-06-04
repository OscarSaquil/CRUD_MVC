
const inputBusqueda = document.getElementById('inputBusqueda');
const tablaBody = document.querySelector('#tablaProductos tbody');
const mensajeSinResultados = document.getElementById('mensajeSinResultados');
const mensajeError = document.getElementById('mensajeError');
const totalPreciosElem = document.getElementById('totalPrecios');
const totalCantidadesElem = document.getElementById('totalCantidades');

// Helper para formatear monto (dos decimales)
function formatearMonto(num) {
  return Number(num).toFixed(2);
}

function renderizarTabla(productos) {
  // Limpiar mensajes previos
  mensajeError.style.display = 'none';
  mensajeSinResultados.style.display = 'none';

  // Vaciar la tabla
  tablaBody.innerHTML = '';

  if (!productos || productos.length === 0) {
    // Si no hay resultados, muestra el mensaje
    mensajeSinResultados.style.display = 'block';
    // Reset de totales
    totalPreciosElem.textContent = '0.00';
    totalCantidadesElem.textContent = '0';
    return;
  }

  // Variables para acumular totales
  let sumaPrecios = 0;
  let sumaCantidades = 0;

  // Recorrer cada producto, crear una fila <tr> y añadirla
  productos.forEach(prod => {
    const valorTotalProducto = parseFloat(prod.precio) * parseInt(prod.stock, 10);

    // Acumular totales
    sumaPrecios += valorTotalProducto;
    sumaCantidades += parseInt(prod.stock, 10);

    // Construir la fila
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.codigo}</td>
      <td>${prod.nombre}</td>
      <td>${prod.descripcion || ''}</td>
      <td>${formatearMonto(prod.precio)}</td>
      <td>${prod.stock}</td>
      <td>${formatearMonto(valorTotalProducto)}</td>
      <td>${new Date(prod.creado_en).toLocaleString()}</td>
      <td>${new Date(prod.actualizado_en).toLocaleString()}</td>
      <td>
        <a href="/editar/${prod.id}" class="btn-editar">Editar</a>
        <a href="/eliminar/${prod.id}" class="btn-eliminar">Eliminar</a>
      </td>
    `;

    tablaBody.appendChild(fila);
  });

  // Actualizar los totales en la interfaz
  totalPreciosElem.textContent = formatearMonto(sumaPrecios);
  totalCantidadesElem.textContent = sumaCantidades;
}

/**
 * Función que hace la petición al backend con fetch, 
 * pasando el término que haya escrito el usuario.
 */
async function buscarYMostrar() {
  const termino = inputBusqueda.value.trim();

  try {
    // Mostrar tabla vacía mientras carga (opcional: spinner)
    tablaBody.innerHTML = '';
    mensajeSinResultados.style.display = 'none';
    mensajeError.style.display = 'none';

    // Llamada a la ruta '/productos/buscar?busqueda=...'
    const respuesta = await fetch(`/buscar?busqueda=${encodeURIComponent(termino)}`);
    if (!respuesta.ok) throw new Error('Error en respuesta del servidor');

    const json = await respuesta.json();
    if (!json.success) {
      throw new Error(json.message || 'Error en la respuesta JSON');
    }

    // Llamar a renderizarTabla con el array de productos
    renderizarTabla(json.data);
  } catch (err) {
    console.error('Error al buscar productos:', err);
    mensajeError.style.display = 'block';
    tablaBody.innerHTML = ''; // Vaciar tabla si hubo error
    totalPreciosElem.textContent = '0.00';
    totalCantidadesElem.textContent = '0';
  }
}

/**
 * Debounce: para que no haga fetch en cada tecla con demasiada rapidez,
 * usamos un pequeño retraso (300 ms) antes de disparar la búsqueda.
 */
let timeoutId = null;
inputBusqueda.addEventListener('input', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    buscarYMostrar();
  }, 300);
});

// Opcional: al cargar la página, hacemos una búsqueda vacía para mostrar todo
document.addEventListener('DOMContentLoaded', () => {
  buscarYMostrar();
});

