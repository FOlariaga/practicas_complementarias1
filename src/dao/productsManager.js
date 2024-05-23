import fs from "fs";
import { get } from "http";

class ProductManager {

    constructor(path) {
        this.products = []
        this.path = path  //"./src/storage.json"
    }

    async addProduct({ title, description, price, thumbnail, code, stock, status, category }) {

        const getId = () => {
            const productFin = this.products.length - 1
            if (productFin >= 0) {
                console.log(this.products[productFin]["id"] + 1)
                return this.products[productFin]["id"] + 1
            }else {
                return 1
            }
        }

        if (fs.existsSync(this.path)) {
            const recovered = await this.getProduct(0)
            this.products = recovered
        }

        if (title && description && price && status && code && stock && category) {
            if (this.products.some((p) => p.code === code)) {
                console.log("el codigo ya se encuentra en otro producto")
                return false
            } else {
                const product = {
                    id: fs.existsSync(this.path)? getId() : 1 ,
                    title: title,
                    description: description,
                    code: code,
                    price: price,
                    status: status,
                    stock: stock,
                    category: category,
                    thumbnail: thumbnail,
                }
                this.products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8")
                return true
            }
        } else {
            const object = { title, description, price, code, stock, status, category }
            const objectIncomplete = []

            for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = object[key];
                    if (element == undefined || element == "") {
                        objectIncomplete.push(key)
                    }
                }
            }
            console.log("falta " + objectIncomplete.join() + " para poder agregar el producto")
            return false
        }
    }

    async getProduct(limit = 0) {
        const jsonProducts = await fs.promises.readFile(this.path, "utf-8")
        const fileProducts = await JSON.parse(jsonProducts)
        this.products = fileProducts
        console.log("productos conseguidos con exito");
        return limit == 0 ? fileProducts : fileProducts.slice(0, limit);
    }

    async getProductById(idProduct) {
        const jsonProducts = await fs.promises.readFile(this.path, "utf-8")
        const fileProducts = await JSON.parse(jsonProducts)
        this.products = fileProducts
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i]
            if (product.id == idProduct) {
                console.log(`producto ${idProduct} encontrado`)
                return product
            }
        }
        console.log("Not found")

    }

    async updateProduct(idProduct, dataToUpdate) {
        const jsonProducts = await fs.promises.readFile(this.path, "utf-8")
        const fileProducts = await JSON.parse(jsonProducts)
        this.products = fileProducts

        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i]

            if (product.id == idProduct) {
                const key = Object.keys(dataToUpdate)
                const value = Object.values(dataToUpdate)
                this.products[i][key] = value[0]
                console.log("dato modificado correctamente");
                await fs.promises.writeFile(this.path, JSON.stringify(this.products),"utf-8")
            }
        }
    }

    async deleteProduct(idProduct) {
        const jsonProducts = await fs.promises.readFile(this.path, "utf-8")
        const fileProducts = await JSON.parse(jsonProducts)
        this.products = fileProducts
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i]
            if (product.id == idProduct) {
                this.products.splice(i, 1)
                console.log("se elimino el producto correctamente");
                await fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8")
                return true
            }
        }
        console.log(`no se encontro ningun producto con el id ${idProduct}`)
        return false
    }
}

export default ProductManager