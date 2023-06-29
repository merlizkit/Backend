const socketClient = io();

socketClient.on('allProducts', (array) => {
    let prodInfo = '';
    array.forEach(product => {
        prodInfo += `${product.code} - ${product.title} || Stock: ${product.stock} || Precio: ${product.price}</br>`;
    })
    products.innerHTML = `Listado de productos </br> ${prodInfo}`;
})

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDesc = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCat = document.getElementById('category');

form.onsubmit = (send) => {
    send.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDesc.value,
        code: inputCode.value,
        price: inputPrice.value,
        stock: inputStock.value,
        category: inputCat.value
    }
    socketClient.emit('newProduct', newProduct);
}