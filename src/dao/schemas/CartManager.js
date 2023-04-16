import fs from 'fs/promises'
import {schemaProducts } from './FileManager.js'
import mongoose from 'mongoose'

const schemaCarts = new mongoose.Schema({
    id:{type:String, required:true},
    nombreProducts:{type:String, required:true}
},{versionKey:false})

export class CartManager {
    #productos
    #productosManager


    constructor() {
        this.#productos = mongoose.model('carts',schemaCarts)
        this.#productosManager = mongoose.model('products',schemaProducts)

    }

    async guardarCarrito(productos) {
        const carrito= new this.#productos(productos)
        await carrito.save()
        return carrito    
    }

    async mostrarCarrito(lim) {
        const carritos = await this.#productos.find().limit(lim)
        return carritos
      }
      

    async buscarCosas() {
        const carritos = await this.#productos.find().lean()
        return carritos
    }

    async buscarCaractProducto(idProduct) {
        const producto = await this.#productosManager.findById(idProduct).lean()
        if (!producto) {
            throw new Error('id no encontrado')
        }else{
            return producto.title
        }
    }

    async buscarCarritoSegunId(idCarrito) {
        const buscada = this.#productos.findById(idCarrito).lean()
        if (!buscada) {
            throw new Error('id no encontrado')
        }else{
        return buscada
        }
    }

    async reemplazarProductosdeCarrito(id, nuevaproductos) {
        const carrito = await this.#productos.findOneAndUpdate(
            { id: id },
            { nombreProducts: nuevaproductos },
            { new: true }
        ).exec()
    
        if (!carrito) {
            throw new Error('id no encontrado')
        }
    
        return carrito.nombreProducts
    }
    

    async borrarCarritoSegunId(id) {
        const carritoBorrado = await this.#productos.findByIdAndDelete(id).lean()
        if (!carritoBorrado) {
          throw new Error('id no encontrado');
        }
        return carritoBorrado;
      }
      
    async reset() {
        await this.#productos.deleteMany({})
      }
      
}

export const cartManager = new CartManager()


