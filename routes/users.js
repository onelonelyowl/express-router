const User = require('../models/User')
const users = require('express').Router()

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

users.post('/', async (req, res) => {
    res.json(await User.create(req.body))
})

users.put('/:id', async (req, res) => {
    const userToUpdate = await User.findByPk(req.params.id)
    res.json(await userToUpdate.update(req.body))
    // res.json(userToUpdate)
})

users.delete('/:id', async (req, res) => {
    const userToDelete = await User.findByPk(req.params.id)
    res.json(userToDelete.destroy())
})

module.exports = {users}