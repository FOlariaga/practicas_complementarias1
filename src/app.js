import express from "express"
import config from "./config.js"
import mongoose from "mongoose";
import initSocket from "./sockets.js";
import viewsRoutes from "./routes/viewsRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import handlebars from "express-handlebars";

const app = express()


const httpServer = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI)
    
    const socketServer = initSocket(httpServer)
    app.set("socketServer", socketServer)
    
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    
    app.engine('handlebars', handlebars.engine())
    app.set('views', `${config.DIRNAME}/views`)
    app.set('view engine', 'handlebars')
    
    app.use('/static', express.static(`${config.DIRNAME}/public`));
    
    app.use("/", viewsRoutes)
    app.use("/api/products", productsRoutes)
    
    console.log(`app iniciada en el puerto ${config.PORT} con acceso a BD`)
})

