const User = require('../models/User')
const users = require('express').Router()
const {check, validationResult} = require('express-validator')

users.get('/', async (req, res) => {
    const usernames = []
    const userObjects = await User.findAll()
    for(const user in userObjects){
        usernames.push(user.name)
    }
    res.json(await User.findAll({attributes: ['name']}))
})

users.get('/:id', async (req, res) => {
    res.json(await User.findByPk(req.params.id))
})

users.post('/', [check("name").not().isEmpty().trim(), check("age").not().isEmpty().trim(), check("name").isLength({min: 5, max: 15})], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    else{
        await User.create(req.body)
        res.json(await User.findAll())
    }
})

users.put('/:id', [check("color").not().isEmpty().trim(), check("name").not().isEmpty().trim()], async (req, res) => {
    const userToUpdate = await User.findByPk(req.params.id)
    res.json(await userToUpdate.update(req.body))
    // res.json(userToUpdate)
})

users.delete('/:id', async (req, res) => {
    const userToDelete = await User.findByPk(req.params.id)
    res.json(userToDelete.destroy())
})

module.exports = {users}