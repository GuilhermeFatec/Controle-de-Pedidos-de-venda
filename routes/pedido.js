const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Pedido = require('../model/pedido')
const validaPedido = [
    check("Numero","Informe o número do pedido").not().isEmpty(),
    check("Cliente","Informe o cliente do pedido").not().isEmpty(),
    check("Descricao","Informe o produto vendido").not().isEmpty(),
    check("Valor","Informe o valor de venda").not().isEmpty(),
    check("Empresa","Informe o fabricante do produto").isIn(['Briggs','Sands','Aquafil'])
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

module.exports = router