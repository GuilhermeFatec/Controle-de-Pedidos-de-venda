const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    Numero:{type: Number},
    Cliente:{type: String},
    Descricao:{type: String},
    Valor:{type: Number},
    Empresa:{type: String, enum:["Briggs","Sand","Aquafil"], default:"Aquafil"},
    Status: {type: String, enum:["Desenvolvimento", "Finalizado"], default:"Desenvolvimento"}
    }, {timestamps:true})

    module.exports = mongoose.model("Pedido", pedidoSchema)