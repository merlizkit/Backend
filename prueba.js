let product = {
    code: 'Error',
    title: 'Titulo',
    description: 'Descripción',
    price: 15,
    thumbnail: 'Sin imagen',
    stock: 500,
};

const checkData = product.filter(product => product === 'Error');
console.log(checkData);