// Supongamos que tienes un array de carritos
const carritos = [
    { id: 1, productos: [] },
    { id: 2, productos: [] },
    { id: 3, productos: [] }
  ];
  
  const carritoIndex = 0; // Índice del carrito a modificar
  const prodID = 14; // El ID del producto a agregar al carrito
  
  // Actualizar el array de productos del carrito seleccionado agregando el prodID
  carritos[carritoIndex].productos.push(prodID);
  
  // Verificar el resultado
  console.log(carritos[carritoIndex]);