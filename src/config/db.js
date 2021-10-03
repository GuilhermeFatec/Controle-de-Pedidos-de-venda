const mongoose = require('mongoose')

const MONGOURI = process.env.MONGODB_URL

const inicializaMongoServer = async() =>{
  try{
      await mongoose.connect(MONGOURI,{
          useNewUrlParser: true,
          useUnifiedTopology: true 
      })
      console.log("🍃 Conectado ao MongoDB!")
  }catch(e){
    console.error(e)
    throw e
  }
}

module.exports = inicializaMongoServer