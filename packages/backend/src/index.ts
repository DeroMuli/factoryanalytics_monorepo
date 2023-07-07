import * as dotenv from 'dotenv'
import express from "express"
import  cors from 'cors';
import router from './routes';
import { testconnection } from './util/sequilizeconnection';
import {setupmockdatasocketconnection} from "./util/websocketconnections"
import { NextFunction, Request , Response} from 'express'
dotenv.config()
const port = process.env.PORT;

const startserver = async() => {

    const app = express()

    await testconnection()
    setupmockdatasocketconnection()

    app.use(cors());
    app.use(express.json())
    //prevent caching to prevent error 304 during realoading of the expo app 
    if(process.env.NODE_ENV === "development"){
        app.use((req : Request,res : Response,next : NextFunction) => {
            res.set("Cache-Control", "no-store")
            next()
        })
    }

    app.use("/api/v1",router)

    app.listen(port, () => {
        console.log(`The server is running on port ${port}`)
    }).on("error", (err : Error) => {
        console.log(err.message)
        process.exit()
    })
     
}

startserver()