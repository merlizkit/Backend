import { Router } from 'express';
import ProductManager from '../managers/productManagerV4.js';
import { uploader } from '../middlewares/multer.js';

const router = Router();
const productManager = new ProductManager('./products.json');

router.get('/', async(req, res) =>{
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
            res.status(500).send({msg: error.message});
    }
})

router.get('/:pid', async(req, res) =>{
    try{
        const {pid} = req.params;
        const prodID = Number(pid);
        const product = await productManager.getProductById(prodID);
        if(product.id == prodID){
            res.status(200).json(product);
        } else {
            res.status(400).send({msg: `Product id ${pid} does not exist`});
        }
    }
    catch(error){
                res.status(500).send({msg: error.message});
    }
})

router.post('/', async (req, res) => {
    try {
        const {title, description, code, price, stock, category, thumbnails} = req.body;
        const newProduct = {
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails,
        }
        const addStatus = await productManager.addProduct(newProduct);
        console.log(addStatus);
        if (addStatus === 'Error: missing parameters') {
            res.status(400).json({msg: `Check ${newProduct.code} parameters: only thumbnails can be empty and stock can be 0`});
        } else if (addStatus === 'Error: Code exists') {
            res.status(400).json({msg: `Could not create product ${newProduct.code}: code already exists`});
        } else {
            res.status(200).json({msg: `Product ${newProduct.code} created successfully`});
        }
    }
    catch(error){
            res.status(500).send({msg: error.message});
    }
})

router.put('/:pid', async (req,res) => {
    try {
        const {pid} = req.params;
        const prodID = Number(pid);
        const productUpd = req.body;
        const updStatus = await productManager.updateProduct(prodID, productUpd);
        if(updStatus === 'OK') {
            res.status(200).json({msg: `Product id ${prodID} has been updated`});
        } else if (updStatus === 'Error: prodId not found') {
            res.status(400).json({msg: `Update failed: Product id ${prodID} not found`});
        } else {
            res.status(400).json({msg: `Product code ${productUpd.code} already in use`});
        }
    }
    catch(error){
                res.status(500).send({msg: error.message});
    }
})

router.delete('/:pid', async (req,res) => {
    try {
        const {pid} = req.params;
        const prodID = Number(pid);
        const delStatus = await productManager.deleteProduct(prodID);
        if (delStatus === 'OK') {
            res.status(200).json({msg: `Product id ${prodID} has been deleted`});
        } else {
            res.status(400).json({msg: `Product id ${prodID} does not exists`});
        }
    }
    catch(error) {
        res.status(500).send({msg: error.message});
    }
})

export default router;