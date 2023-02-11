//Importaciones
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Importo la clase ProducManager
const ProductManager = require("./index.js");
//Puerto 
const port = 8080;

app.listen(port, ()=>{
    console.log("express funcionando en ", port);
});

//Instancia de la calse ProductManager
let data = new ProductManager('./products.json');


//EndPoint ruta "/" titulo
app.get('/', (req, res)=>{
    res.send('Desafio 3 - Servidor Express');
});

//EndPoint ruta "/productos" sin parametros retorna todos los productos.
//Con parametro Query retorna la cantidad indicada en "limit".
app.get('/productos', async (req,res)=>{
    const {limit }= req.query; //Obtengo parametro query
    const allProducts= await data.getProducts(); //Obtengo todos los productos

    //Verifico si se ingresa el parametro "limit"
    //Si no se ingresa retorno todos los productos, si se ingresa retorno los productos limitados
    if(limit === ""){
        return res.json(allProducts);
    }else{
        const productLimited = allProducts.slice(0,limit);
        return res.json(productLimited);
    };
});

//EndPoint ingresando parametro id del producto
app.get('/productos/:pid', async (req, res)=>{
    const {pid} = req.params;
    //Validacion de ingreso numerico del dato
    if(isNaN(pid)){
        console.log("Valor ingresado incorrecto");
        return res.status(400).json({
            message: `El valor ingresado como id es incorrecto ingresado es incorrecto`,
        });
    };
    //Obtengo todos los productos
    const allProducts = await data.getProducts();
    //Busco el producto por el id
    const productFinded = allProducts.find((unit)=>{
        return unit.id === Number(pid);
    });
    //Valido si se encontro el producto
    if(!productFinded){
        return res.json({
            message: `El producto con el id ${pid}, no existe`,
            productFinded
        });
    };
    //Retorno el producto encontrado
    return res.json(productFinded);
});




