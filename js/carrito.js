document.addEventListener('DOMContentLoaded', cargarCarrito);

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    mostrarProductosEnCarrito(carrito);
}

function mostrarProductosEnCarrito(productos) {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    if (productos.length === 0) {
        carritoContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>Precio: $${producto.price}</p>
        `;
        carritoContainer.appendChild(productoElement);
    });
}

document.getElementById('vaciarCarrito').addEventListener('click', function() {
    localStorage.removeItem('carrito');
    cargarCarrito();
});
