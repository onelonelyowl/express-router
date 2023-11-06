const Fruit = require('../models/Fruit')
const fruits = require('express').Router()

fruits.get('/', async (req, res) => {
    // const names = []
    // const userObjects = await Fruit.findAll()
    // for(const user in userObjects){
    //     names.push(user.name)
    // }
    res.json(await Fruit.findAll())
})

fruits.get('/:id', async (req, res) => {
    res.json(await Fruit.findByPk(req.params.id))
})

fruits.post('/', async (req, res) => {
    res.json(await Fruit.create(req.body))
})

fruits.put('/:id', async (req, res) => {
    const fruitToUpdate = await Fruit.findByPk(req.params.id)
    res.json(await fruitToUpdate.update(req.body))
})

fruits.delete('/:id', async (req, res) => {
    const fruitToDelete = await Fruit.findByPk(req.params.id)
    res.json(fruitToDelete.destroy())
})

module.exports = {fruits}