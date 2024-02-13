function route(target, { 
    kind, 
    name 
}) { 
    if (kind != 'method') return target;
    const reqId = randomUUID();

    return function (req, res) {
        const requestStartedAt = performance.now();
        console.time('benchmark')
        const afterExecution = target.apply(this, [req, res])
        const data = {
            reqIdm,
            name,
            method: req.method,
            url: req.url
        }

        afterExecution.finally(_=>{
            console.timeEnd('benchmark')
        })
        
        return afterExecution;
    }
}

module.exports = {
    route
}