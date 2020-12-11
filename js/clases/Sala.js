class Sala{
    constructor(id,nombre,metros2,precioHora,equipado,estaDisponible,estaOculta){
        this.id = id;
        this.nombre = nombre;
        this.metros2 = parseInt(metros2);
        this.precioHora = parseInt(precioHora);
        this.equipado = equipado || false;
        this.estaDisponible= estaDisponible || false;
        this.estaOculta=estaOculta || false;
    }

    maximoPersonas(){
        return parseInt(this.metros2/5);
    }

    damePrecio(horas){
        return Math.round((horas*this.preciohora) * 100) / 100;
    }

    cambiaDisponibilidad(){ 
        this.estaDisponible=!this.estaDisponible;
    }

    ocultar(){
        this.estaOculta=!this.estaOculta;
    }

}