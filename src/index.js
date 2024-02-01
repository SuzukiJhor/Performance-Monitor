function route(target, { kind, name }) { 
    console.log({target, kind, name})
    return target
}

const { createServer } = require('http')

@route
class Server {
    static async handler(req, res) {
        return res.end('ok')
    }
}


createServer(Server.handler).listen(3000, ()=>console.log('Server is running'))
