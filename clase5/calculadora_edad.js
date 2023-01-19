/* Debe contar con una variable que almacene la fecha actual (utilizar moment())
Debe contar con una variable que almacene sólo la fecha de tu nacimiento (utilizar moment).
Validar con un if que la variable contenga una fecha válida (utilizar el método isValid());
Finalmente, mostrar por consola cuántos días han pasado desde que naciste hasta el día de hoy. (utilizar el método diff()
Extra: Cambia tu moment a la versión 1.6.0, al no ser la misma versión mayor, nota el cambio al correr el programa. */

let moment = require('moment')
let fechaActual = moment().format('YYYY-MM-DD')
let fechaNacimiento = moment('2004-04-27', 'yyyy')
let diasPasados = []

if (moment().isValid()) {
    fechaActual = moment()
} else {

    const isvalid = require(fechaNacimiento);

    let data = isvalid

    try {
        data = await isvalid(data, {
            'user': { type: String, required: true },
            'pass': { type: String, required: true }
        });

    } catch (err) {
        // A validation error occurred.
    }
}
// data is validated.


