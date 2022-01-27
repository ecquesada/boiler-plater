const router = require('express').Router()

const Person = require('../models/Person')

//rotas da api
//Criação de dados - CREATE
router.post('/', async (req, res) => {

    //req.body

    // {name: "Eric", age: 33, approved: false}
    //git ecquesada eric.quesada@hotmail.com
    const {name, age, approved} = req.body

    if(!name){
        res.status(422).json({error: 'Nome é obrigatório!'})
        return
    }

    const person = {
        name,
        age,
        approved
    }
    try {
        //criando dados
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    }
    catch(error){
        res.status(500).json({error: error})
    }
})

//Leitura de dados - READ
router.get('/', async(req, res) => {

    try {
        //lendo dados
        const people = await Person.find()
        res.status(200).json(people)
        
    }
    catch(error){
        res.status(500).json({error: error})
    }

})


//Leitura de dados por id - READ
router.get('/:id', async(req, res) => {
    //console.log(req)
    //extrair dado na requisição
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({error: 'Usuário não encontrado!'})
            return
        }

        res.status(200).json(person)
    }
    catch(error){
        res.status(500).json({error: error})
    }

})

//Atualização de dados - Update (PUT, PATCH)
router.patch('/:id', async(req, res) => {
    //extrair dado na requisição
    const id = req.params.id

    const {name, age, approved} = req.body

    const person = {
        name,
        age,
        approved
    }

    try {
        const updatePerson = await Person.updateOne({_id: id}, person)

        //console.log(updatePerson)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({error: 'Usuário não encontrado!'})
            return
        }

        res.status(200).json(person)
    }
    catch(error){
        res.status(500).json({error: error})
    }

})

//Deletar dados - DELETE
router.delete('/:id', async(req, res) => {
    //extrair dado na requisição
    const id = req.params.id

    const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({error: 'Usuário não encontrado!'})
            return
        }

    try {
        const deletePerson = await Person.deleteOne({_id: id}, person)

        //console.log(deletePerson)

        if(deletePerson){
            res.status(200).json({message: 'Usuário removido com sucesso!'})
        }

    }
    catch(error){
        res.status(500).json({error: error})
    }

})


module.exports = router