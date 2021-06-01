import anuncio from "./anuncio.js";

 export  default class anuncio_auto extends anuncio{
    constructor(id,titulo,transaccion,descripcion,precio,puertas,kilometros,potencia ) {
        super(id,titulo,transaccion, descripcion,precio);
   
    this.puertas=puertas;
    this.kilometros=kilometros;
    this.potencia=potencia;
    }
};