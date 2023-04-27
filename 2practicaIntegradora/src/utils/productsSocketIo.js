initProductsSocket = (io) => {        
    const mensajes = [
        // {user: 'Estani', message: 'Hola como están'}
    ]
    let connectedClients = []

    io.on('connection', socket => {
        // console.log('Nuevo cliente conectado')
        connectedClients.push(socket)
        console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

        socket.on('message', data => {
            console.log('message',data)
            mensajes.push(data)
            io.emit('messageLogs', mensajes)
            // persisti 
        })

        socket.on('authenticated', data => {
            
            socket.broadcast.emit('newUserConnected', data)
        })
        
        socket.on('disconnect',()=>{
            connectedClients = connectedClients.filter((client) => client !== socket)
            console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
        })
    })
}

module.exports = {
    initProductsSocket
}
