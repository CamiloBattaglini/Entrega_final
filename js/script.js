document.addEventListener('DOMContentLoaded', function() {
    // Término de búsqueda predeterminado
    const terminoPredeterminado = 'xiaomi';
    buscarProductos(terminoPredeterminado);
});

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    buscarProductos(query);
});

function buscarProductos(query) {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const productos = data.results;
            mostrarProductos(productos);
        })
        .catch(error => console.error('Error al buscar productos:', error));
}

function mostrarProductos(productos) {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = '';
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>Precio: $${producto.price}</p>
            <button onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Agregar al carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        title: 'Exito!',
        text: 'Producto agregado al carrito',
        icon: 'success',
        confirmButtonText: 'ok!'
    })
}

