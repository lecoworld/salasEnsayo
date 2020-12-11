
class Cliente{
    constructor(id,password,nombre,apellido1,apellido2,email,dni,direccionCompleta,esAdmin){
      this.id=id || 99999;      
      this.email=email;      
      this.password=password || "";
      this.nombre=nombre || "SIN NOMBRE";
      this.apellido1=apellido1 || "SIN APELLIDO1";
      this.apellido2=apellido2 || "SIN APELLIDO2";
      this.grupoMusica="";
      this.dni=dni || "11111111A";
      this.direccion=direccionCompleta || "Calle de la felicidad";
      this.esMoroso=false;
      this.numeroHoras=0;
      this.esVip=false;   
      this.salaReservada="";
      this.esAdmin=esAdmin || false;
    }

    toString(){
       return  this.nombre + " " + this.apellido1 +" "+this.apellido2;
    }

    getNombreCompleto(){
       return this.nombre+" "+this.apellido1 + " " + this.apellido2;
    }

    subeHoras(horas){
        this.numeroHoras=this.numeroHoras+horas;
        if(this.numeroHoras>100)
            this.hazloVip();
    }

    hazloVip(){
        this.esVip=true;
    }

    hazloMoroso(){
        this.esMoroso=true;
    }

    quitarMorosidad(){
        this.esMoroso=false;
    }

    compruebaPass(intento){
        return (intento==this.password);
    }

    reservaSala(id,horas){
        if(this.salaReservada=="")
            this.salaReservada=id+"-"+horas;
        else
            this.salaReservada+=";"+id+"-"+horas;
        this.subeHoras(horas);
    }

  }
  