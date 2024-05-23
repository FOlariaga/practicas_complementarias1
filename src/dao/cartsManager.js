import fs from "fs";

class CartsManager {
    constructor(path) {
        this.path = path
        this.newId = 1
        this.carts = []
    }

    async createCart() {

        const getId = () => {
            const cartfin = this.carts.length - 1
            if (cartfin >= 0) {
                console.log(this.carts[cartfin]["id"] + 1)
                return this.carts[cartfin]["id"] + 1
            } else {
                return 1
            }
        }

        if (fs.existsSync(this.path)) {
            const jsonCarts = await fs.promises.readFile(this.path, "utf-8")
            const fileCarts = await JSON.parse(jsonCarts)
            this.carts = fileCarts
        }
        const cart = {
            id: fs.existsSync(this.path) ? getId() : 1,
            product: []
        }
        this.carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts), "utf-8")
    }

    async addProductToCart(idCart, idProduct) {
        const jsonCarts = await fs.promises.readFile(this.path, "utf-8")
        const fileCart = await JSON.parse(jsonCarts)
        this.carts = fileCart

        // verifica que existe el carrito indicado en el id
        const existCart = this.carts.find(e => e.id == idCart)

        if (existCart) {
            //toma el indice del array en el que se encuentra ese carrito
            const indexCart = this.carts.indexOf(existCart)
            
            //verifica si ya se encuentra ese producto en el carrito
            const existProduct = this.carts[indexCart]["product"].find(e => e.id == idProduct)

            if (existProduct) {
                // toma el indice del producto para posteriormente aumentarle 1 a la cantidad
                const indexProduct = this.carts[indexCart]["product"].indexOf(existProduct)
                this.carts[indexCart]["product"][indexProduct]["quantity"] += 1
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts), "utf-8")

            } else {
                //si no se encuentra en el carrito lo agrega con una cantidad inicial de 1
                const newProduct = {id: idProduct, quantity: 1}
                this.carts[indexCart]["product"].push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts), "utf-8" )
            }
        } else {
            console.log("no existe un carrito con ese id")
        }












        // for (let i = 0; i < this.carts.length; i++) {
        //     const cartId = this.carts[i];
        //     if (cartId.id == idCart) {
        //         cartId["product"].forEach(e => {
        //             if (e["id"] == idProduct) {
        //                 e["quantity"] = e["quantity"] + 1
        //             }
        //         });
        //         await fs.promises.writeFile(this.path, JSON.stringify(this.carts), "utf-8")
        //     }

        // }
    }

    async getCartById(idCart) {
        const jsonCarts = await fs.promises.readFile(this.path, "utf-8")
        const fileCarts = await JSON.parse(jsonCarts)
        this.carts = fileCarts
        for (let i = 0; i < this.carts.length; i++) {
            const cart = this.carts[i]
            if (cart.id == idCart) {
                console.log(`producto ${idCart} encontrado`)
                return cart
            }
        }
        console.log("Not found")

    }
}

export default CartsManager