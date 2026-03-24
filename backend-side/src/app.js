import express from "express"

const app = express()

app.get('/', (req, res) => {
    res.send("E-Commerce Backend API is running!")
})

export {app};