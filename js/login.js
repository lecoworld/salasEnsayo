//variable global que será un objeto de la clase Antibot
var objetoPregunta;

window.onload=function(){
    imprimePreguntaNueva();
}

// coge el los valores de los imput y valida todo.
function valida(){
    var nombreUsuario= document.getElementById("username").value;
    var pass= document.getElementById("password").value;
    var respuestaAntiBot=document.getElementById("respuesta").value;
    var logueoValido=false;
    var usuarioLogueado;
    listaUsuarios.forEach(cliente=>{
        if(cliente.email==nombreUsuario && cliente.password==pass){
        logueoValido=true;
        usuarioLogueado=cliente;
        }
    })
    var esBot= !(objetoPregunta.comprueba(respuestaAntiBot));
    if(!esBot && logueoValido)
        if (usuarioLogueado.esMoroso)
            location.href="moroso.html";
        else if(usuarioLogueado.esAdmin){
            location.href="homeAdmin.html?id="+usuarioLogueado.id;
        }
        else{
            location.href="homeUsuario.html?id="+usuarioLogueado.id;
            
    }
    else{
        alert("credenciales o pregunta antibot incorrecto");
        imprimePreguntaNueva();
    }
}

//genera una nueva pregunta random
function generaNuevaPregunta(){
    return listaPreguntas[Math.floor(Math.random() * listaPreguntas.length)];
    //var objetoPregunta=listaPreguntas[Math.floor(Math.random() * listaPreguntas.length)];
}

//imprime una pregunta 
function imprimePreguntaNueva(){    
    var divPregunta = document.getElementById("pregunta");    
    objetoPregunta= generaNuevaPregunta();
    divPregunta.innerHTML="<p>"+objetoPregunta.pregunta+"</p>";

}

function volver(){
    history.back();
}
