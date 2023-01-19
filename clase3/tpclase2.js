class TicketManager {
    #precioBaseDeGanancia = 0.15 //variable privada de la clase
    constructor() {
        this.eventos = [] // creo el arreglo vacio
    }
    getEventos = () => this.eventos //trae los eventos que tengo


    agregarEvento = (nombre, precio, capacidad = 50, fecha = Date()) => { //parametros que se deben ingresar y pide la consigna
        const newEvent = { //declaro el objeto y le paso los parametros que recibe para poder crearlo
            nombre,
            lugar,
            precio,
            capacidad,
            fecha
        }
        // subo el nuevo evento a "eventos",arreglo que tiene todos los eventos
        if (this.eventos.length === 0) { //si el arreglo de eventos esta vacio, cargo el ID 1
            this.newEvent.id = 1
        } else {
            newEvent.id = this.eventos[this.eventos.length - 1].id + 1
        }
        this.eventos.push(newEvent)

        /* [...this.eventos, newEvent] */ //agregar un evento a traves de spread operator
    }
    agregarUsuario = (id, )=>{

    }
    ponerEventoEnGira = (id,localidad,newFecha)=>{

    }
}

const ticketManager = new TicketManager()

console.log(ticketManager.getEventos())