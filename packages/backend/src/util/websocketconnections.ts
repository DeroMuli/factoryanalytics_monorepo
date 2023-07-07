import { WebSocketServer , WebSocket } from 'ws';
const wss = new WebSocketServer({port : 80})

export const setupmockdatasocketconnection = () => {
    wss.on("connection" , (ws : WebSocket) => {
        console.log("connection established")
        setInterval(() => {
            let temp = generaterandomtemp()
            let speed = generaterandomspeed()
            ws.send(JSON.stringify({temp,speed}))
        } , 1000)
    })
}

const generaterandomtemp = () : number => {
    return Math.floor((Math.random() * 10) + 25 )
}

const generaterandomspeed = () : number => {
    return Math.floor((Math.random() * 20) + 100)
}