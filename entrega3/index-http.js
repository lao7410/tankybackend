const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req)
    res.end('Hola')

})

server.listen(8080,()=>{

    console.log('Servidor corriendo en el puerto 8080')
})
