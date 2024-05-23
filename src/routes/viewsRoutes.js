import { Router } from "express";
import productsModel from "../dao/models/products.model.js"
import chatModel from "../dao/models/chat.model.js";

const router = Router()

router.get("/products", async (req, res) => {
    const products = await productsModel.find().lean()
    res.render("products", {data: products})
})

router.get("/chat", async (req, res) => {
    res.render("chat", {})
})

router.get("/cart", async (req, res) => {
    res.render("cart", {})
})

export default router