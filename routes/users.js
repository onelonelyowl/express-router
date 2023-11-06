const User = require('../models/User')
const app = require('../src/app')

app.get('/users', async (req, res) => {
    res.json(await User.findAll({
        attributes: [name]
    })
    )
})

app.get('/users/:id', async (req, res) => {
    res.json(await User.findByPk(req.params.id))
})

app.post('/users', async (req, res) => {
    res.json(await User.create(req.body))
})

app.put('/users/:id', async (req, res) => {
    const userToUpdate = await User.findByPk(req.params.id)
    res.json(await userToUpdate.update(req.body))
})