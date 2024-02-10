function route(target, { 
    kind, 
    name 
}) { 
    if (kind != 'method') return target;

    return async function (req, res) {
        const {
            statusCode,
            message
        } = await target.apply(this, [req, res])
        res.writeHead(statusCode)
        res.end(JSON.stringify(message))
    }
}

module.exports = {
    route
}