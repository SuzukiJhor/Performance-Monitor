function route(target, { kind, name }) { 
    console.log({target, kind, name})
    return target
}

const { once } = require('events')
const { createServer } = require('http')
const { randomUUID } = require('crypto')
const Db = new Map()

@route
class Server {
    static async handler(req, res) {
        if(req.method === "POST"){
            const data = await once(req,'data')
            const item = jSON.parse(data)
            item.id = randomUUID()

            Db.set(item.id, item)
            res.writeHead(201)
            res.end(JSON.stringify({message: item}))
            return
        }

        res.writeHead(200)
        res.end(JSON.stringify({message: [...Db.values]}))
    }
}


createServer(Server.handler).listen(3000, ()=>console.log('Server is running'))
