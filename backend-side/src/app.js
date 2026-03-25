import express from "express"
import userRoute from "./routes/user.route.js"

const app = express()

app.get('/', (req, res) => {
    res.send("E-Commerce Backend API is running!")
})

app.use(express.json())
app.use("/api/v1/users", userRoute)

export {app};