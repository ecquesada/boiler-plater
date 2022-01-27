// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de entender, ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// rota inicial /end point
app.get('/', (req, res) => {

    //mostrar req
    res.json({message: 'Teste'})
})

//ed8LoM0gwt766PZD

//mongodb+srv://equesada:<password>@apicluster.so0ln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.so0ln.mongodb.net/bancodaapi?retryWrites=true&w=majority`

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.so0ln.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectado no MongoDB!')
    // escutar uma porta
    app.listen(3000)
})
.catch((err) => console.log(err))

// // escutar uma porta
// app.listen(3000)