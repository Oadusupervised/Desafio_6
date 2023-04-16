import { cartManager } from "../dao/schemas/CartManager.js"
import { Cart } from "../entidades/cart.js"
export async function postCarritosController(req,res,next){
    const carrito= new Cart(req.body)
    const result = await cartManager.guardarCarrito(carrito)
    req['io'].sockets.emit('carritos',await cartManager.buscarCosas())
    res.json(result)
}
