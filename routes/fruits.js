const Fruit = require('../models/Fruit')
const fruits = require('express').Router()
const {check, validationResult} = require('express-validator')

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

fruits.post('/', [check("color").not().isEmpty().trim(), check("name").not().isEmpty().trim(), check("name").isLength({min: 5, max: 15})], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    res.json(await Fruit.create(req.body))
})

fruits.put('/:id', [check("color").not().isEmpty().trim(), check("name").not().isEmpty().trim()], async (req, res) => {
    const fruitToUpdate = await Fruit.findByPk(req.params.id)
    res.json(await fruitToUpdate.update(req.body))
})

fruits.delete('/:id', async (req, res) => {
    const fruitToDelete = await Fruit.findByPk(req.params.id)
    res.json(fruitToDelete.destroy())
})

module.exports = {fruits}