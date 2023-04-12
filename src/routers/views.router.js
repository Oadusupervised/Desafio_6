import {Router} from "express"
import {fileManager} from "../dao/schemas/FileManager.js"
import {cartManager} from "../dao/schemas/CartManager.js"
import { mensajesManager } from "../dao/schemas/MessagesManger.js"

export const routerVistas = Router()


routerVistas.get('/realTimeMessages',async (req,res,next)=>{
    const mensajes = await mensajesManager.mostrarMensajes()
    res.render('realTimeMessages',{
        pageTitle:'Mensajes',
        hayMensajes:mensajes.length>0,
        mensajes
    })
})


routerVistas.get('/realTimeProducts',async (req,res,next)=>{
    const productos = await fileManager.mostrarTodosProductos()
    res.render('realTimeProducts',{
        pageTitle:'productos',
        hayProductos:productos.length>0,
        productos
    })
})

routerVistas.get('/realTimeCarts',async (req,res,next)=>{
    const carritos = await cartManager.buscarCosas()
    res.render('realTimeCarts',{
        pageTitle:'carritos',
        hayCarritos:carritos.length>0,
        carritos
    })
})


