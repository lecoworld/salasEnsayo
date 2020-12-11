class AntiBot{
    constructor(pregunta,respuesta){
      this.pregunta=pregunta || "";
      this.respuesta=respuesta || "";
    
    }
    comprueba(intento){
       return (intento.trim().toLowerCase()==this.respuesta);
    }


  }
  