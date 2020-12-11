//lo mismo que en usuarios. usamos una lista auxiliar para poder ordenar las salas cuando las filtramos
var listaAux=listaSalas;
    
onload = function () {
    //recuperamos el usuario administrador logueado  y la info de la página

    var id =dameIdLogueado();
    if (id) {
        usuarioLogueado = listaUsuarios.filter(usuario => usuario.id == id)[0];
        if(usuarioLogueado.id[0]!="A")
            location = "homeUsuario.html";
        document.getElementById("saludo").innerHTML+=" administrador "+usuarioLogueado.nombre;
        cargaSalas();
        cargaUsuarios();
        
    } else 
        location = "homeUsuario.html";
}


//filtra la lista de salas por un valor pasado por parámetro por defecto filtra por el valor del select filtrar establecido
function filtrar(value=document.getElementsByName("filtrar")[0].value){
    var valorOrdenar= document.getElementsByName("ordenar")[0].value;
  
    switch (value) {
        case "disponible":
        listaAux=listaSalas.filter(lista=>lista.estaDisponible==true);
        break;
        case "noDisponible":
            
        listaAux=listaSalas.filter(lista=>lista.estaDisponible==false);
        break;
        case "oculta":
            
        listaAux=listaSalas.filter(lista=>lista.estaOculta==true);
        
        break;
        case "visible":
            
        listaAux=listaSalas.filter(lista=>lista.estaOculta==false);
        
        break;
        case "equipado":
            
        listaAux=listaSalas.filter(lista=>lista.equipado==true);
        
        break;
        case "noEquipado":
            
        listaAux=listaSalas.filter(lista=>lista.equipado==false);
        
        break;

        default:
        listaAux=listaSalas;
            break;
    }
    

    ordenar();
}

//idem que filtrar pero ordena
function ordenar(value= document.getElementsByName("ordenar")[0].value){
    listaAux.sort( (a,b)=>{
        if ( a[value] < b[value] ){
                return -1;
            }
            if ( a.id > b.id ){
                return 1;
            }
            return 0;
    } );
    
    cargaSalas(listaAux);
}


function dameIdLogueado(){
return window.location.search // ?id=21
        .slice(1) // id=21
        .split("=") // ["id","21"]
    [1]; // 21
}

//carga las salas en su capa
function cargaSalas(lista=listaSalas){
    var divSalas =  document.getElementById("capaSalas");
    if(divSalas.innerHTML!="")
        divSalas.innerHTML="";

        lista.forEach(sala => {
            var divSalaIndividual= document.createElement("div");
            divSalaIndividual.sala=sala;
            divSalaIndividual.classList.add("container")
            divSalaIndividual.classList.add("mb-2")
            var nombre = document.createElement("span");
            nombre.innerHTML="id: "+sala.id;
            nombre.innerHTML+=", nombre: "+sala.nombre;
            nombre.innerHTML+=", disponibilidad: "+((sala.estaDisponible)?"SI":"NO");
            nombre.innerHTML+=", está oculta: "+((sala.estaOculta)?"SI":"NO");
            divSalaIndividual.appendChild(nombre);
            divSalas.appendChild(divSalaIndividual);
            //boton eliminar
            var boton = document.createElement("button");
            boton.classList.add("btn");
            boton.classList.add("btn-danger");
            boton.classList.add("btn-sm");
            boton.classList.add("ml-2");
            divSalaIndividual.appendChild(boton);
            boton.innerHTML="X";
            boton.addEventListener("click",eliminarSala);
            divSalaIndividual.appendChild(boton);
            //boton modificar
            boton = document.createElement("button");
            
            boton.classList.add("btn");
            boton.classList.add("btn-info");
            boton.classList.add("btn-sm");
            boton.classList.add("ml-2");
            divSalaIndividual.appendChild(boton);
            boton.innerHTML="modificar";
            boton.addEventListener("click",modificarSala);
            divSalaIndividual.appendChild(boton);
            //ocultar

            //reservar
        });
}

// Se pide confimación por prompt para borrar la sala. El id de la sala se obtiene como propiedad adherida
function eliminarSala(evento){

    var salaAEliminar= evento.target.parentNode.sala;
    var confirmacion= prompt("vas a eliminar la sala "+salaAEliminar.nombre+". escribe 'SI' para eliminarla");
    if((confirmacion=="SI")){
        alert("has eliminado la sala "+salaAEliminar.nombre);
    listaSalas= listaSalas.filter(sala=>sala.id!=salaAEliminar.id);
    cargaSalas();
    filtroYOrdenarPorDefecto();
    }else{
        alert("Se ha cancelado el borrado de la sala " +salaAEliminar.nombre);
    }
    
}

//se crea un formulario para modificar la una sala. Se incluyen botones para procesar o cancelar la modificación
function modificarSala(evento){
    var divParaModificar = document.getElementById("auxSala");

    if(divParaModificar.innerHTML!="")
    divParaModificar.innerHTML="";
    var salaAModificar= evento.target.parentNode.sala;

    creaInputNuevaSala("nombre","text",salaAModificar);
    creaInputNuevaSala("metros2","number",salaAModificar);
    creaInputNuevaSala("precioHora","number",salaAModificar);
    creaInputNuevaSala("equipado","boleano",salaAModificar);
    creaInputNuevaSala("disponible","boleano",salaAModificar);
    creaInputNuevaSala("oculto","boleano",salaAModificar);
    creaInputNuevaSala("submit","",salaAModificar);
    creaInputNuevaSala("borrar","",salaAModificar);
}

//lo mismo que antes pero para crear una sala nueva
function botonCrear(){
    var divCrear=document.getElementById("auxSala");
    if(divCrear.innerHTML!=""){
        console.log("ya existe");
        divCrear.innerHTML="";        
    }

    creaInputNuevaSala("nombre","text");
    creaInputNuevaSala("metros2","number");
    creaInputNuevaSala("precioHora","number");
    creaInputNuevaSala("equipado","boleano");
    creaInputNuevaSala("disponible","boleano");
    creaInputNuevaSala("oculto","boleano");
    creaInputNuevaSala("submit");
    creaInputNuevaSala("nuevaSala","borrar");
    
   
}

//crea un elementos de formulario para modificar o crear una sala
function creaInputNuevaSala(campo,tipo,sala){
    var divNuevaSala= document.getElementById("auxSala");  
    
    if(tipo=="text" ){
        var label= document.createElement("label");
        label.setAttribute("for",campo);
        label.innerHTML=campo+":";
        label.classList.add("mr-2")
        var input = document.createElement("input");
        input.type=tipo;
        input.required=true;
        (sala)? input.value=sala.nombre:"";
        input.id=campo;
        divNuevaSala.appendChild(label);
        divNuevaSala.appendChild(input);
        divNuevaSala.appendChild(document.createElement("br"));
    }
    else if( tipo=="number"){
        var label= document.createElement("label");
        label.setAttribute("for",campo);
        label.innerHTML=campo+":";
        label.classList.add("mr-2")
        var input = document.createElement("input");
        input.type=tipo;
        input.required=true;
        if(sala){
            if (campo=="metros2")
                input.value=sala.metros2;            
            else if(campo=="precioHora")                       
                input.value=sala.precioHora;
        }
        input.id=campo;
        divNuevaSala.appendChild(label);
        divNuevaSala.appendChild(input);
        divNuevaSala.appendChild(document.createElement("br"));
        
    }

    else if (tipo=="boleano"){
        var span = document.createElement("span");        
        span.innerHTML=campo+":";        
        divNuevaSala.appendChild(span);
        var label= document.createElement("label");
        label.classList.add("mr-2")
        label.setAttribute("for","si"+campo);
        label.innerHTML="SI";
        var input = document.createElement("input");
        input.type="radio"
        input.value="si";
        input.id="si"+campo;
        input.name=campo;
        divNuevaSala.appendChild(input);
        divNuevaSala.appendChild(label);
        var label= document.createElement("label");
        label.setAttribute("for","no"+campo);
        label.classList.add("mr-2")
        label.innerHTML="NO";
        var input = document.createElement("input");
        input.type="radio"
        input.value="no";
        input.id="no"+campo;
        input.checked=true;
        input.name=campo;
        divNuevaSala.appendChild(input);
        divNuevaSala.appendChild(label);
        divNuevaSala.appendChild(document.createElement("br"));
    }
    else if(campo=="submit"){
        var boton= document.createElement("button");
        boton.classList.add("btn");
        boton.classList.add("btn-success");
        boton.classList.add("btn-sm");
        boton.classList.add("ml-2");
           
        if(sala){
            boton.innerHTML="Editar Sala";            
            boton.addEventListener("click",function (){
                return pushSalaModificada(sala.id);
            })
        }else{
            boton.innerHTML="Crear Nueva Sala";          
            boton.addEventListener("click",pushNuevaSala)
        }
        divNuevaSala.appendChild(boton);
    }
    else if(campo=="borrar"){
        var boton= document.createElement("button");
        boton.innerHTML="Cancelar";
        boton.classList.add("btn");
        boton.classList.add("btn-danger");
        boton.classList.add("btn-sm");
        boton.classList.add("ml-2");
        boton.addEventListener("click",borraAux)
        divNuevaSala.appendChild(boton);
    }    
}

//se recogen los datos del formulario y efectúa el push de una nueva sala ya creada
function pushNuevaSala(){
    var nombre = document.getElementById("nombre").value;
    var metros2 = document.getElementById("metros2").value;
    var precioHora = document.getElementById("precioHora").value;   

    if(nombre=="" || metros2=="" || precioHora=="")
        alert("rellena todos los datos por favor");
    else{
        var id= dameIdNuevo();
        var equipado = (dameValorRadio("equipado")=="si")?true:false;
        var disponible = (dameValorRadio("disponible")=="si")?true:false;
        var oculto = (dameValorRadio("oculto")=="si")?true:false;
        listaSalas.push(new Sala(id,nombre,metros2,precioHora,equipado,disponible,oculto));
        listaSalas.sort(ordenaMenorAMayorId);
        console.log(listaSalas);
        borraAux();
        cargaSalas();
        filtroYOrdenarPorDefecto();
    }

}

//en esta ocasion se elimina la sala a modificar y se hace push la sala modificada.
function pushSalaModificada(idSala){
    console.log(idSala);
    var nombre = document.getElementById("nombre").value;
    var metros2 = document.getElementById("metros2").value;
    var precioHora = document.getElementById("precioHora").value;
    if(nombre=="" || metros2=="" || precioHora=="")
        alert("rellena todos los datos por favor");
    else{

        var id=idSala;
        var equipado = (dameValorRadio("equipado")=="si")?true:false;
        var disponible = (dameValorRadio("disponible")=="si")?true:false;
        var oculto = (dameValorRadio("oculto")=="si")?true:false;
        
        listaSalas=listaSalas.filter(sala=>sala.id!=id)
        listaSalas.push(new Sala(id,nombre,metros2,precioHora,equipado,disponible,oculto));
        listaSalas.sort(ordenaMenorAMayorId);
        console.log(listaSalas);
        borraAux();
        cargaSalas();
        filtroYOrdenarPorDefecto();
    }

}

// establece por defecto el valor de los campos select de filtro y orden
function filtroYOrdenarPorDefecto(){
    document.getElementsByName("ordenar")[0].value="id";        
        document.getElementsByName("filtrar")[0].value="todas";
}

//se borra el contenido del div AuxSala usado para editar o crear sala
function borraAux(){    
    document.getElementById("auxSala").innerHTML="";
}

//recupera el valor de un input radio cuyo name es pasado como parámetro
function dameValorRadio(nombre){
    var valor;
    var inputs = document.getElementsByName(nombre);
    for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].checked)
            valor=inputs[index].value;
        
    }
    return valor;
}

function dameIdNuevo(){
    return (listaSalas.sort(ordenaPorId)[0].id)+1;
}

function ordenaMenorAMayorId(a,b){
    if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;

}
function ordenaPorId( a, b ) {
  if ( a.id > b.id ){
    return -1;
  }
  if ( a.id < b.id ){
    return 1;
  }
  return 0;
}

function muestraUsuarios(){
    document.getElementById("divUsuarios").style.display="block";
    document.getElementById("salas").style.display="none";
}
function muestraSalas(){
    document.getElementById("salas").style.display="block";
    document.getElementById("divUsuarios").style.display="none";
}

