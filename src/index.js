
const path = require('path');
const fs = require('fs/promises');


//Clase para productos
class Product{
    constructor(title, description, price, thumbnail, code, stock ){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}


//Clase Product Manager
class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    };
    //Metodo addProduct
    addProduct = async (product)=>{
        try {
            //Desestruturacion del objeto
            const {title, description, price, thumbnail, code, stock} = product;
            //Validacion de ingreso de datos
            if(!title || !description || !price ||!thumbnail || !code || !stock){
                return console.log("Todos los campos son obligatorios");
                //Validacion de code no repetido
            }else if(this.products.find(element => element.code === product.code)){
                console.log("El codigo esta repetido");
            }else{
                // Id autoincrementable
                let id = 0;
                if(this.products.length === 0){
                    id = 1;
                }else {
                    id = this.products.length + 1;
                }
                // Agrego el objeto con el id en el array products
            this.products.push({id,...product});
            //Escribo en el archivo db.json
            await fs.writeFile(this.path, JSON.stringify(this.products,null,2));
            }
        } catch (err) {
            return (err);
        };
    };
    //Metodo getProduct para obtener todos los productos
    getProducts = async ()=>{
        try {
            //Productos del archivo products.json
            const productsList = await fs.readFile(this.path);
            //console.log("productos del json", JSON.parse(productsList));
            return JSON.parse(productsList);
        } catch (error) {
            console.log(error);
        };
    };
    //Metodo Update para actualizar el producto
    updateProduct = async(id, data) =>{
        try {
            //Productos del archivo utilizando el metodo getProductById
        let upProduct = await this.getProductById(id);
        let prodIndex = this.products.findIndex(prod => prod.id === id);
        this.products[prodIndex] = {...upProduct, ...data};
        //Escritura del producto actualizado
        await fs.writeFile(this.path, JSON.stringify(this.products,null,2));
        return "Product update Succefully";
        } catch (error) {
            console.log(error);
            return error;
        }
    };


    //Metodo getProductById para obtener los productos por su id
    getProductById = async (id)=>{
        try {
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            let resultado = this.products.find(product => product.id === id);
            if(resultado === undefined){
                return " Product Not found";
            }else{
                return resultado;
            };
        } catch (error) {
            console.log(error);
            return error;
        }
        
    };

    deleteProduct = async (id)=>{
        try {
            if(!id){
                throw new Error('Missing Id');
            }
        const products = await this.getProducts();
        const filteredProducts = products.filter(product => product.id !== id);
        fs.writeFile(this.path, JSON.stringify(filteredProducts, null,2), 'utf-8');
        console.log('Product Delete');
        } catch (error) {
            console.log(error);
            return error
        }
    };
};

//Instancia de la clase Product
const main = async ()=>{
    /* const product1 = new Product('Quilmes', 'Lata de 450cc', 250, './img-quilmes', 2, 200);
    const product2 = new Product('Stella Artois', 'Lata de 450cc', 350, './img-stella', 5, 300);
    const product3 = new Product('Miller', 'Lata de 750cc', 550, './img-miller', 18, 100);
    const product4 = new Product('Isembeck', 'Lata de 750cc', 400, './imagen-ise', 25, 100); */
//Ruta de archivo a escribir
/* const pathJson = path.join(`${__dirname}/products.json`);  */
//Instancia de la clase ProductManager
/* const adminProductos = new ProductManager(pathJson); */

//Productos agregados
/* await adminProductos.addProduct(product1);
await adminProductos.addProduct(product2);
await adminProductos.addProduct(product3); 
await adminProductos.addProduct(product4); */

//Imprimo por consola todos los productos
/* await adminProductos.getProducts(); */

//Busco los productos por id e imprimo por consola
/* adminProductos.getProductById(2);  */

//Actualizacion de productos
/* adminProductos.updateProduct(1, {title:"Coca Cola"}); */

//Eliminar producto
//adminProductos.deleteProduct(3);

};

main();
module.exports = ProductManager;



