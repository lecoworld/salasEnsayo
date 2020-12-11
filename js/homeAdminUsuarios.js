//listaUsuariosAux es una variable que usaremos para cuando filtremos los usuarios, los podamos ordenar.
//por ejemplo filtramos las salas ocultas y se muestran 4, al seleccionar un orden nuevo, se ordenarán sólo las 4
var listaUsuariosAux = listaUsuarios;

function cargaUsuarios() {
    cabeceraTablaUsuarios();
    cargaUsuariosEnTabla();
}

function cabeceraTablaUsuarios() {
    var theadUsuarios = document.getElementById("cabeceraTablaUsuarios");

    var cliente = new Cliente();
    for (var propiedad in cliente) {
        var th = document.createElement("th");
        theadUsuarios.appendChild(th);
        th.innerHTML = propiedad;
    }

}

function cargaUsuariosEnTabla(lista = listaUsuarios) {
    var tbodyUsuarios = document.getElementById("cuerpoTablaUsuarios");
    if (tbodyUsuarios.innerHTML != "")
        tbodyUsuarios.innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
        var row = document.createElement("tr");
        row.usuario = lista[i];
        if (!lista[i].esAdmin)
            row.addEventListener("click", detallesUsuario);

        for (var prop in lista[i]) {
            var td = document.createElement("td");
            if (prop == "salaReservada" && lista[i][prop] != "")
                td.innerHTML = "sala: " + lista[i][prop].split("-")[0] + ", horas: " + lista[i][prop].split("-")[1];
            else
                td.innerHTML = lista[i][prop];


            if (lista[i].id == dameIdLogueado()) {
                td.classList.add("datosAdminLogueado");
            }
            row.appendChild(td);

        }
        tbodyUsuarios.appendChild(row);

    }

}

//ordena los Usuarios por el parametro valor.
//el segundo parámetro por defecto es la listaAux que es usada para ordenar una lista filtrada
function ordenarUsuarios(valor, lista = listaUsuariosAux) {
    console.log("vamos a ordennar por :" + valor);
    lista.sort((a, b) => {
        if (a[valor] < b[valor]) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;

    });
    cargaUsuariosEnTabla(lista);

}

function filtrarUsuarios(valor = document.getElementsByName("filtrarUsuario")[0].value) {
    console.log(valor);
    var valorDeOrdenacionActual = document.getElementsByName("ordenarUsuario")[0].value;
    switch (valor) {
        case "admins":
            listaUsuariosAux = listaUsuarios.filter(usuario => usuario.esAdmin);
            ordenarUsuarios(valorDeOrdenacionActual, listaUsuariosAux);
            break;
        case "usuarios":
            listaUsuariosAux = listaUsuarios.filter(usuario => !usuario.esAdmin);
            ordenarUsuarios(valorDeOrdenacionActual, listaUsuariosAux);
            break;
        case "morosos":
            listaUsuariosAux = listaUsuarios.filter(usuario => usuario.esMoroso);
            ordenarUsuarios(valorDeOrdenacionActual, listaUsuariosAux);

            break;
        case "vips":
            listaUsuariosAux = listaUsuarios.filter(usuario => usuario.esVip);
            ordenarUsuarios(valorDeOrdenacionActual, listaUsuariosAux);

            break;
        case "tieneReserva":
            listaUsuariosAux = listaUsuarios.filter(usuario => usuario.salaReservada != "");
            ordenarUsuarios(valorDeOrdenacionActual, listaUsuariosAux);

            break;

        default:
            cargaUsuariosEnTabla(listaUsuarios);
            break;
    }


}

//rellenamos el div vacío de id "auxUsuario"
//desde aquí podemos cambiar los datos del usuario y enviar los cambios con los botones creados en la función
function detallesUsuario(event) {
    var divAuxUsuario = document.getElementById("auxUsuario");
    divAuxUsuario.innerHTML = "";
    var usuario = event.currentTarget.usuario;
    for (var prop in usuario) {
        if (!usuario.esAdmin) {
            if (prop == "nombre" || prop == "apellido1" || prop == "apellido2" ||
                prop == "id" || prop == "grupoMusica" || prop == "dni" || prop == "email" ||
                prop == "direccion") {
                var label = document.createElement("label");
                label.classList.add("h5")
                label.innerHTML = prop[0].toUpperCase() + prop.slice(1);
                divAuxUsuario.appendChild(label);
                var input = document.createElement("input");
                input.classList.add("ml-3")
                input.value = usuario[prop];
                if (prop == "id")
                    input.disabled = true;
                input.name = "U" + prop;
                input.type = "text";
                if (prop == "email")
                    input.type = "email";
                divAuxUsuario.appendChild(input);
                divAuxUsuario.appendChild(document.createElement("br"));
            } else if (prop == "esMoroso" || prop == "esVip" || prop == "esAdmin") {
                var label = document.createElement("label");
                label.classList.add("h5")
                label.innerHTML = prop[0].toUpperCase() + prop.slice(1);
                var select = document.createElement("select");                
                select.classList.add("ml-3")
                select.name = "U" + prop;
                var option = document.createElement("option");
                option.innerHTML = "sí";
                option.value = true;
                select.appendChild(option)
                var option = document.createElement("option");
                option.innerHTML = "no";
                option.value = false;
                if (!usuario[prop])
                    option.selected = true;
                select.appendChild(option)
                divAuxUsuario.appendChild(label);
                divAuxUsuario.appendChild(select);
                divAuxUsuario.appendChild(document.createElement("br"));

            } else if (prop == "salaReservada" && usuario[prop] != "") {
                var label = document.createElement("label");                
                label.classList.add("h5")
                label.innerHTML = prop[0].toUpperCase() + prop.slice(1);
                divAuxUsuario.appendChild(label);
                var input = document.createElement("input");                
                input.classList.add("ml-3")
                input.type = "text";
                input.name = "Usala";
                input.value = usuario[prop].split("-")[0];
                divAuxUsuario.appendChild(input);
                divAuxUsuario.appendChild(document.createElement("br"));
                var label = document.createElement("label");                
                label.classList.add("h5")
                label.innerHTML = "Horas";
                divAuxUsuario.appendChild(label);
                var input = document.createElement("input");                
                input.classList.add("ml-3")
                input.name = "Uhoras";
                input.type = "number";
                input.value = (usuario[prop].split("-")[1]) ? usuario[prop].split("-")[1] : "";
                divAuxUsuario.appendChild(input);
                divAuxUsuario.appendChild(document.createElement("br"));
            }
        }
    }
    var botonEditarUsuario = document.createElement("button");
    
    botonEditarUsuario.classList.add("btn");
    botonEditarUsuario.classList.add("btn-info");
    botonEditarUsuario.classList.add("btn-sm");
    botonEditarUsuario.classList.add("ml-2");
    botonEditarUsuario.addEventListener("click", pushEditarUsuario);
    botonEditarUsuario.innerHTML = "actuazar usuario";
    divAuxUsuario.appendChild(botonEditarUsuario);

    var botonEliminarUsuario = document.createElement("button");
    botonEliminarUsuario.classList.add("btn");
    botonEliminarUsuario.classList.add("btn-danger");
    botonEliminarUsuario.classList.add("btn-sm");
    botonEliminarUsuario.classList.add("ml-2");
    
    botonEliminarUsuario.addEventListener("click", eliminarUsuario);
    botonEliminarUsuario.innerHTML = "Eliminar Usuario";
    divAuxUsuario.appendChild(botonEliminarUsuario);

    var botonCancelar = document.createElement("button");
    botonCancelar.classList.add("btn");
    botonCancelar.classList.add("btn-secondary");
    botonCancelar.classList.add("btn-sm");
    botonCancelar.classList.add("ml-2");
    botonCancelar.addEventListener("click", borraDivAux);
    botonCancelar.innerHTML = "Cancelar";
    divAuxUsuario.appendChild(botonCancelar);
    console.log(event.currentTarget.usuario.getNombreCompleto());
}

//se recogen todos los valores de los inputs y se hace un push para editarlo. Si se cambia la reserva libera la anterior reservada OJO
function pushEditarUsuario(event) {
    var id = document.getElementsByName("Uid")[0].value;
    var nombreNuevo = document.getElementsByName("Unombre")[0].value;
    var apellido1Nuevo = document.getElementsByName("Uapellido1")[0].value;
    var apellido2Nuevo = document.getElementsByName("Uapellido2")[0].value;
    var emailNuevo = document.getElementsByName("Uemail")[0].value;
    var grupoNuevo = document.getElementsByName("UgrupoMusica")[0].value;
    var dniNuevo = document.getElementsByName("Udni")[0].value;
    var direccionNueva = document.getElementsByName("Udireccion")[0].value;
    var esMorosoNuevo = document.getElementsByName("UesMoroso")[0].value;
    var esVipNuevo = document.getElementsByName("UesVip")[0].value;
    var esAdminNuevo = document.getElementsByName("UesAdmin")[0].value;

    if (document.getElementsByName("Usala")[0])
        var numeroSalaReserva = document.getElementsByName("Usala")[0].value;

    if (document.getElementsByName("Uhoras")[0])
        var numeroHoras = document.getElementsByName("Uhoras")[0].value

    var usuarioAcambiar = listaUsuarios.find(usuario => usuario.id == id);
    usuarioAcambiar.dni = dniNuevo;
    usuarioAcambiar.nombre = nombreNuevo;
    usuarioAcambiar.apellido1 = apellido1Nuevo;
    usuarioAcambiar.apellido2 = apellido2Nuevo;
    usuarioAcambiar.email = emailNuevo;
    usuarioAcambiar.grupoMusica = grupoNuevo;
    usuarioAcambiar.direccion = direccionNueva;
    usuarioAcambiar.esMoroso = (esMorosoNuevo == "true") ? true : false;
    usuarioAcambiar.esVip = (esVipNuevo == "true") ? true : false;
    usuarioAcambiar.esAdmin = (esAdminNuevo == "true") ? true : false;

    if (document.getElementsByName("Usala")[0]) {
        if (numeroSalaReserva != "" && numeroHoras != "") {
            if (listaSalas.filter(sala => sala.id == numeroSalaReserva)[0].estaDisponible) {
                numeroSalaOriginal = usuarioAcambiar.salaReservada.split("-")[0];
                liberarSala(numeroSalaOriginal)
                reservarSala(numeroSalaReserva);
                var horasOriginales = parseInt(usuarioAcambiar.salaReservada.split("-")[1])
                if (parseInt(numeroHoras) > horasOriginales)
                    usuarioAcambiar.subeHoras(parseInt(numeroHoras) - horasOriginales);
                else if (parseInt(numeroHoras) < horasOriginales)
                    usuarioAcambiar.numeroHoras = usuarioAcambiar.numeroHoras - (horasOriginales - parseInt(
                        numeroHoras));
                usuarioAcambiar.salaReservada = numeroSalaReserva + "-" + numeroHoras;
            } else {
                alert("no se ha podido cambiar la reserva ya que la nueva sala no está disponible");
            }
        } else {
            usuarioAcambiar.salaReservada = "";
        }
    }


    cargaUsuariosEnTabla();

    borraDivAux();
}

function reservarSala(id) {
    listaSalas.find(sala => sala.id == parseInt(id)).estaDisponible = false;
}

function liberarSala(id) {
    listaSalas.find(sala => sala.id == parseInt(id)).estaDisponible = true;
}

function borraDivAux() {
    document.getElementById("auxUsuario").innerHTML = "";
}

function eliminarUsuario(event) {
    var idUsuario = document.getElementsByName("Uid")[0].value;
    var confirmacion = prompt("escribe 'SI' para eliminar al usuario de id " + idUsuario);
    if (confirmacion == "SI") {
        if (listaUsuarios.filter(u => u.id == idUsuario)[0].salaReservada != "")
            liberarSala(listaUsuarios.filter(u => u.id == idUsuario)[0].salaReservada.split("-")[0])
        listaUsuarios = listaUsuarios.filter(usuario => usuario.id != idUsuario);
        cargaUsuariosEnTabla();
        borraDivAux();
        alert("USUARIO ELIMINADO")
    } else(
        alert("NO se ha eliminado al usuario")
    )

}

//crea un formulario para introducir los datos del nuevo usuario a crear. luego habrá que hacer push.
function crearUsuario() {
    var divAuxUsuario = document.getElementById("auxUsuario");
    divAuxUsuario.innerHTML = "";
    var usuario = new Cliente();

    for (var prop in usuario) {
        if (prop == "nombre" || prop == "apellido1" || prop == "apellido2" ||
            prop == "grupoMusica" || prop == "dni" || prop == "email" ||
            prop == "direccion" || prop == "password") {            
            var label = document.createElement("label");
            label.classList.add("h5");            
            label.innerHTML = prop[0].toUpperCase() + prop.slice(1);
            divAuxUsuario.appendChild(label);
            var input = document.createElement("input");
            input.classList.add("ml-3");
            if (prop == "id")
                input.disabled = true;
            input.name = "U" + prop;
            input.type = "text";
            if (prop == "email")
                input.type = "email";
            else if (prop == "password") {
                input.type = "password"
                divAuxUsuario.appendChild(input);
                divAuxUsuario.appendChild(document.createElement("br"));
                var label = document.createElement("label");
                label.classList.add("h5");
                label.innerHTML = "Repite " + prop[0].toUpperCase() + prop.slice(1);
                divAuxUsuario.appendChild(label);
                var input = document.createElement("input");
                input.name = "U" + prop + "2";
                input.type = "password";
            }
            divAuxUsuario.appendChild(input);
            divAuxUsuario.appendChild(document.createElement("br"));

        } else if (prop == "esMoroso" || prop == "esVip" || prop == "esAdmin") {
            var label = document.createElement("label");
            label.classList.add("h5")
            label.innerHTML = prop[0].toUpperCase() + prop.slice(1);
            var select = document.createElement("select");
            select.classList.add("ml-3");
            select.name = "U" + prop;
            var option = document.createElement("option");
            option.innerHTML = "sí";
            option.value = true;
            select.appendChild(option)
            var option = document.createElement("option");
            option.innerHTML = "no";
            option.value = false;
            if (!usuario[prop])
                option.selected = true;
            select.appendChild(option)
            divAuxUsuario.appendChild(label);
            divAuxUsuario.appendChild(select);
            divAuxUsuario.appendChild(document.createElement("br"));

        }

    }
    var botonEditarUsuario = document.createElement("button");
    botonEditarUsuario.addEventListener("click", pushNuevoUsuario);
    botonEditarUsuario.innerHTML = "Introducir nuevo usuario";
    divAuxUsuario.appendChild(botonEditarUsuario);
    var botonCancelar = document.createElement("button");
    botonCancelar.addEventListener("click", borraDivAux);
    botonCancelar.innerHTML = "Cancelar";
    divAuxUsuario.appendChild(botonCancelar);
}

/*
    Recoge los values de los inputs de la capa de creacion de usuario y hace un push a la lista de usuarios
*/
function pushNuevoUsuario() {
    var pass1 = document.getElementsByName("Upassword")[0].value;
    var pass2 = document.getElementsByName("Upassword2")[0].value;
    if( pass1=="" || pass2 =="")    
        alert("Rellena Las contraseñas.")
    else if (pass1 != pass2 ) {
        alert("Las contraseñas del nuevo usuario no coinciden.")
    } else {
        var esAdminNuevo = document.getElementsByName("UesAdmin")[0].value;
        var idNuevo=dameIdNuevoUsuario(esAdminNuevo);
        var nombreNuevo=document.getElementsByName("Unombre")[0].value;        
        var apellido1Nuevo=document.getElementsByName("Uapellido1")[0].value;
        var apellido2Nuevo=document.getElementsByName("Uapellido2")[0].value;        
        var direccionNuevo=document.getElementsByName("Udireccion")[0].value;        
        var emailNuevo=document.getElementsByName("Uemail")[0].value;        
        var grupoMusicaNuevo=document.getElementsByName("UgrupoMusica")[0].value;
        var dniNuevo=document.getElementsByName("Udni")[0].value;        
        var esMorosoNuevo=document.getElementsByName("UesMoroso")[0].value;
        var esVipNuevo=document.getElementsByName("UesVip")[0].value;
        esMorosoNuevo=(esMorosoNuevo=="true")?true:false;
        esAdminNuevo=(esAdminNuevo=="true")?true:false;
        esVipNuevo=(esVipNuevo=="true")?true:false;
        var nuevoUsuario= new Cliente(idNuevo,pass1,nombreNuevo,apellido1Nuevo,apellido2Nuevo
            , emailNuevo, dniNuevo,direccionNuevo,esAdminNuevo);
        if (esMorosoNuevo)
            nuevoUsuario.hazloMoroso();
        if (esVipNuevo)
            nuevoUsuario.hazloVip();
        listaUsuarios.push(nuevoUsuario);
        cargaUsuariosEnTabla();
        borraDivAux();
        alert("!Nuevo usuario creado!");
    }
}

//esAdmin es un booleano
//esta funcion genera un ID nuevo dependiendo de si es usuario "UX" o admin "AX" (X es un numero)
function dameIdNuevoUsuario(esAdmin) {
    var listaNuevoId;
    var idNueva;
    if (esAdmin=="true"){
        idNueva="A";
        console.log("si es admin")
        listaNuevoId = listaUsuarios.filter(u => u.esAdmin == true);
    }
    else{
        idNueva="U";
        console.log("no es admin")
        listaNuevoId = listaUsuarios.filter(u => u.esAdmin == false);
    }
    listaNuevoId.sort((a, b) => {
        if (a.id > b.id) {
            return -1;
        }
        if (a.id < b.id) {
            return 1;
        }
        return 0;

    });
    return idNueva+(parseInt(listaNuevoId[0].id.slice(1))+1);

    
}