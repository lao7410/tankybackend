const fs = require('fs')
/* const { getMaxListeners } = require('process') */
/* 
fs.writeFile('./data.txt', Date(), (err) => {
  if (err) return console.log('Error al escribir el archivo');
})

fs.readFile('./data.txt', 'utf-8', (err, data) => {
  if (err) return console.log('Error al leer el archivo')
  console.log(data);
})
 */

/* fs.promises.writeFile('./data.txt', 'esto es un ejemplo','utf-8')
.then(() => {console.log('El archivo es un ejemplo')})
.catch((err) => {console.log('Error al escribir el archivo') */


const manejoArchivo = async () => {
    const usuarios = [
        {id:1, name:'Estanislao' , dni:314565, email:'asad@getMaxListeners.com'}
    ]
    let usuariosParse = JSON.stringify (usuarios)
    console.log (usuariosstringify)