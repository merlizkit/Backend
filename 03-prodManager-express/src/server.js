import express from 'express';
import ProductManager from './managers/productManager.v3.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const productManager = new ProductManager('./products.json');

app.get('/products', async(req, res) =>{
    try {
        const {limit} = req.query;  
        if(limit){
            const products = await productManager.listTopN(limit);
            res.status(200).json(products);
        } else {
            const products = await productManager.getProducts();
            res.status(200).json(products);
        }
    }
    catch(error){
            res.status(500).send({message: error.message});
    }
})

app.get('/products/:pid', async(req, res) =>{
    try{
        const {pid} = req.params;
        const prodID = Number(pid);
        const product = await productManager.getProductById(prodID);
        if(product){
            res.status(200).json(product);
        } else {
            res.status(400).send({msg: `Product id ${pid} does not exist`});
        }
    }
    catch(error){
                res.status(500).send({message: error.message});
    }
})
app.listen(8080, ()=>{
    console.log('Server listening on port 8080');
})