const request = require('supertest')
const app = require('./src/app')
const { Fruit, User } = require("./models/index")
const { seedFruits, seedUsers } = require("./seedData");
const db = require("./db/connection")

beforeAll(async () => {
    await db.sync({force: true});
    await Fruit.bulkCreate(seedFruits);
    await User.bulkCreate(seedUsers);
})

describe('testing my user endpoints', () => {
    it('get returns status 200', async () => {
        const response = await request(app).get('/users/')
        expect(response.statusCode).toBe(200)
    });
    it('get returns correct user data', async () => {
        const response = await request(app).get('/users')
        expect(JSON.parse(response.text)).toEqual(expect.arrayContaining([{"name": "User 1"}]))
    });
    it('post returns status 200', async () => {
        const response = await request(app).post('/users/').send({name: "jeff" , age: 23})
        expect(response.statusCode).toBe(200)
    });
    // it('post returns created user', async () => {
    //     const response = await request(app).post('/users/').send({name: "jeff" , age: 23})
    //     expect(JSON.parse(response.text)).toEqual(expect.objectContaining({name: "jeff" , age: 23}))
    // }); // post now returns all users instead of just new one, so this test is not necessary
    it('put returns status code 200', async () => {
        const response = await request(app).put('/users/2').send({name: "jeff" , age: 23})
        expect(response.statusCode).toBe(200)
    });
    it('put returns updated user', async () => {
        const response = await request(app).put('/users/2').send({name: "jeff" , age: 23})
        expect(JSON.parse(response.text)).toEqual(expect.objectContaining({name: "jeff" , age: 23}))
    });
    it('delete return status code 200', async () => {
        const response = await request(app).delete('/users/2')
        expect(response.statusCode).toBe(200)
    });
    it('delete returns deleted user', async () => {
        const response = await request(app).delete('/users/3')
        expect(JSON.parse(response.text)).toEqual({}) //empty object as it has been deleted
    });
});

describe('testing my fruit endpoints', () => {
    it('get returns status 200', async () => {
        const response = await request(app).get('/fruits/')
        expect(response.statusCode).toBe(200)
    });
    it('get returns correct fruit data', async () => {
        const response = await request(app).get('/fruits')
        expect(JSON.parse(response.text)[0]).toEqual(expect.objectContaining({"name": "Apple"}))
    });
    it('post returns status 200', async () => {
        const response = await request(app).post('/fruits/').send({name: "Pineapple" , color: "yellow"})
        expect(response.statusCode).toBe(200)
    });
    it('post returns created fruit', async () => {
        const response = await request(app).post('/fruits/').send({name: "Pineapple" , color: "yellow"})
        expect(JSON.parse(response.text)).toEqual(expect.objectContaining({name: "Pineapple" , color: "yellow"}))
    });
    it('put returns status code 200', async () => {
        const response = await request(app).put('/fruits/2').send({name: "Pineapple" , color: "yellow"})
        expect(response.statusCode).toBe(200)
    });
    it('put returns updated fruit', async () => {
        const response = await request(app).put('/fruits/2').send({name: "Pineapple" , color: "yellow"})
        expect(JSON.parse(response.text)).toEqual(expect.objectContaining({name: "Pineapple" , color: "yellow"}))
    });
    it('delete return status code 200', async () => {
        const response = await request(app).delete('/fruits/2')
        expect(response.statusCode).toBe(200)
    });
    it('delete returns deleted fruit', async () => {
        const response = await request(app).delete('/fruits/3')
        expect(JSON.parse(response.text)).toEqual({}) //empty object as it has been deleted
    });
    it('passing no name to post user rejects to an error array', async () => {
        const response = await request(app).post('/users/').send({name: "", age: 23})
        expect(JSON.parse(response.text)).toHaveProperty("errors")
    });
    it('passing no color to post fruit rejects to an error array', async () => {
        const response = await request(app).post('/fruits/').send({name: "expected_error", color: ""})
        expect(JSON.parse(response.text)).toHaveProperty("errors")
    });
});