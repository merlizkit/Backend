/* ---------------------------------- users --------------------------------- */
export const genUserErrorMissParam = (user) => {
    return `Some properties are missing or not valid.
    List of requires properties:
     - first_name: needs to be String, received "${user.first_name}"
     - last_name: needs to be String, received "${user.last_name}"
     - email: needs to be String, received "${user.email}"
     - age: needs to be Number, received "${user.age}"`
}

/* -------------------------------- products -------------------------------- */
export const genProdErrorMissParam = (product) => {
    return `Some properties are missing or not valid.
    List of requires properties:
     - title:  needs to be String, received "${product.title}"
     - description:  needs to be String, received "${product.description}"
     - code:  needs to be String, received "${product.code}"
     - price: needs to be Number, received "${product.price}"
     - stock: needs to be Number, received "${product.stock}"
     - category:  needs to one of the following: ['pterm','selab','mprim','insum'] }, received "${product.category}"`
}

export const genProdErrorCodeExists = (product) => {
    return `Product code "${product.code}" is already in use by another product.`
}

/* ---------------------------------- carts --------------------------------- */
export const genCartErrorMissProduct = (prodId) => {
    return `Product ID: "${prodId}" does not exists.`
}

export const genCartErrorMissCart = (cartId) => {
    return `Cart ID: "${cartId}" does not exists.`
}