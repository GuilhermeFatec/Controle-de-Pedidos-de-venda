const { request, response } = require("express")
const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { ResultWithContext } = require("express-validator/src/chain")
const pedido = require("../model/pedido")

const Pedido = require('../model/pedido')
const validaPedido = [
    check("Numero","Informe o número do pedido").not().isEmpty(),
    check("Cliente","Informe o cliente do pedido").not().isEmpty(),
    check("Descricao","Informe o produto vendido").not().isEmpty(),
    check("Valor","Informe o valor de venda").not().isEmpty(),
    check("Empresa","Informe o fabricante do produto").isIn(['Briggs','Sand','Aquafil']),
    check("Status","Informe o Status do pedido").isIn(['Desenvolvimento','Finalizado'])
]

/**
 * Listar todos os pedidos
 * GET /pedidos
 */
router.get("/", async(request,response) => {
    try{
        const pedidos = await Pedido.find()
        response.json(pedidos)
    } catch(err){
        response.status(500).send({
            errors: [{message:"Não foi possível obter o pedido"}]
        })
    }
})
/**
 * Listar apenas um pedido via ID
 * GET /pedidos/:id
 */
router.get('/:id', async(request,response)=>{
    try{
        const pedido = await Pedido.find({"_id" : request.params.id})
        response.json(pedido)
    }catch (err){
        response.status(400).send({
            errors: [{message: `Não foi possível obter o pedido com o ID ${request.params.id}`}]
        })
    }
})

/**
 * Incluir novo pedido
 * POST /pedidos
 */
router.post("/", validaPedido, async(request,response)=>{
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).json({
            errors: errors.array()
        })
    } 
    try{
        let pedido = new Pedido(request.body)
        await pedido.save()
        response.send(pedido)
    }catch(err){
        return response.status(400).json({
            errors: [{message: `Erro ao salvar a pedido: ${err.message}`}]
        })
    }
})
/**
 * Apaga um pedido via ID
 * DELETE /pedidos/:id
 */
router.delete("/:id", async(request,response)=>{
    await Pedido.findByIdAndRemove(request.params.id)
    .then(pedido =>{
        response.send({message: `Pedido ${pedido.Numero} excluido com sucesso!`})
    }).catch (err =>{
        return response.status(400).send({
            errors: [{message: `Não foi possível excluir o pedido`}]
        })
    })
})

/**
 * Altera um pedido
 * PUT /pedidos/:id
 */
router.put("/", validaPedido, async(request,response) =>{
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).json({
            errors: errors.array()
        })
    }
    let dados = request.body
    await Pedido.findByIdAndUpdate(request.body._id, {$set: dados})
    .then(pedido =>{
        response.send({message: `Pedido ${pedido.Numero } alterado com sucesso!`})
    }).catch (err =>{
        return response.status(400).send({
            errors: [{message: "Não foi possível alterar o pedido"}]
        })
    })
})

module.exports = router