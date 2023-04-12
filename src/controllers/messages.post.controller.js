import { mensajesManager } from "../dao/schemas/MessagesManger.js"
import { Message } from "../entidades/messages.js"
export async function postMessagesController(req,res,next){
    const productos= new Message(req.body)
    const result = await mensajesManager.guardarMensajes(productos)
    req['io'].sockets.emit('mensajes',await mensajesManager.mostrarMensajes())
    res.json(result)
}
