const ioServer = io()
const submitProduct = document.querySelector('#addProduct')  //Esto manda a handlebars de realtrime
const title = document.querySelector('#title')
const description = document.querySelector('#description')   //agregar los mismos tipos q en las funciones para no confundir
const code = document.querySelector('#code')
const price = document.querySelector('#price')
const statusInput = document.querySelector('#status')
const stock = document.querySelector('#stock')
const category = document.querySelector('#category')
const productID = document.querySelector('#productDelete')
const deleteBtn = document.querySelector('#deleteProduct')
const contenedor = document.querySelector('#container')



addProduct.addEventListener('click', (event) => { //cambiar el nombre de submit a add a ver si engancha
    event.preventDefault()

    let product = {                     //revisar variable porque hice lo mismo 5 veces y anduvo en la ultiam'????????????????
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,

    }

    ioServer.emit('product', product)       //funciona carajo
})

deleteBtn.addEventListener('click', (event) => {
    event.preventDefault()

    let pid = productID.value

    ioServer.emit('deleteProduct', pid)
})

ioServer.on('mensajeServer', data => {
    contenedor.innerHTML = ''

    data.forEach(element => {           //funciono solo con literals!!!!! ojo en el telcado q esta mal la tecla
        contenedor.innerHTML += `<div>
                                        <h4>${element.title}</h4>
                                        <p>${element.description}</p>
                                        <p>${element.category}</p>
                                        <p>${element.stock}</p>
                                        <p>${element.price}</p> 
                                        <p>${element.id}</p> 
                                    </div>
                                   `
    })
})

ioServer.on('productoAgregado', data => { //no tiro error /preguntar a lu, porque puede q el foreach 
    contenedor.innerHTML = ''

    data.forEach(element => {
        contenedor.innerHTML += `<div>
                                    <h4>${element.title}</h4>
                                    <p>${element.description}</p>
                                    <p>${element.category}</p>
                                    <p>${element.stock}</p>
                                    <p>${element.price}</p> 
                                </div>`
    })
})

ioServer.on('productoEliminado', data => {  //revisar que pase a false el status y cambiar la funcion que lo elimina
    contenedor.innerHTML = ''

    data.forEach(element => {
        contenedor.innerHTML += `<div>
                                    <h4>${element.title}</h4>
                                    <p>${element.description}</p>
                                    <p>${element.category}</p>
                                    <p>${element.stock}</p>
                                    <p>${element.price}</p> 
                                </div>`
    })
})