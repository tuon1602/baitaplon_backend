import express from "express";
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
import cors from 'cors'
import compression from 'compression'
require('dotenv').config()

let app = express()

//config app
app.use(cors({origin: true}))
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended: false,limit:'50mb'}))
app.use(compression())

let port = process.env.PORT || 6969

app.listen(port, () =>
{
    console.log("backend nodejs is running on the port:" + port)
})

viewEngine(app)
initWebRoutes(app)

connectDB()
