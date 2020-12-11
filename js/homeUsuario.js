        var usuarioLogueado;

/* 
        Si está logueado hay un parámetro en la url. En este caso, recupera el usuario en la variable global usuarioLogueado
        con la que trabajaremos.
*/
        window.onload = function () {
            var id = window.location.search // ?id=21
                .slice(1) // id=21
                .split("=") // ["id","21"]
            [1]; // 21
            if (id) {

                usuarioLogueado = listaUsuarios.filter(usuario => usuario.id == id)[0];
                navParaUsuario();
                document.getElementById("bienvenida").innerHTML += "¡Hola otra vez " + usuarioLogueado.nombre + "!";
            }


            cargaCarrusel();


        }

        //cambia el nav cuando hay usuario logueado
        function navParaUsuario() {
            var aLogin = document.getElementById("enlaceLogin");
            aLogin.parentNode.removeChild(aLogin);
            var menu = document.getElementById("menu");
            var li = document.createElement("li");
            li.classList.add("nav-item");
            li.classList.add("active");
            var aAreaPersonal = document.createElement("a");
            aAreaPersonal.classList.add("nav-link")
            aAreaPersonal.href = "javascript: void(0)";
            aAreaPersonal.addEventListener("click", muestraInfoPersonal);

            aAreaPersonal.innerHTML = "Area Personal";

            li.appendChild(aAreaPersonal);
            menu.appendChild(li);

            var li = document.createElement("li");
            li.classList.add("nav-item")

            li.classList.add("active")
            var aLogOut = document.createElement("a");
            aLogOut.href = "/html/homeUsuario.html";
            aLogOut.innerHTML = "Salir";

            aLogOut.classList.add("nav-link")

            li.appendChild(aLogOut);
            menu.appendChild(li);





        }

        //muestra los datos de usuario. se incluyen botones para poder modificar los datos personales
        function muestraInfoPersonal() {

            document.getElementById("general").style.display = "none";
            document.getElementById("divSalas").style.display = "none";
            document.getElementById("salaInd").innerHTML= "";

            document.getElementById("divAreaPersonal").style.display = "block";
            document.getElementById("divAreaPersonal").innerHTML = "";
            var divAreaPersonal = document.getElementById("divAreaPersonal");
            var tituloDatosPersonales= document.createElement("h3");
            tituloDatosPersonales.className="mb-4 display-4";
            tituloDatosPersonales.innerHTML="Estos son tus datos:";
            divAreaPersonal.appendChild(tituloDatosPersonales);
            var divCuerpoDatosPersonales=document.createElement("div");
            divCuerpoDatosPersonales.classList.add("container");            
            divCuerpoDatosPersonales.classList.add("container");
            divAreaPersonal.appendChild(divCuerpoDatosPersonales);
            for (var prop in usuarioLogueado) {

                if(prop!="esVip" && prop!="esMoroso" && prop!="esAdmin" && prop!="password" ){

                if(prop!="id"){
                    var labelDato=document.createElement("label");
                    labelDato.innerHTML="<b>"+prop[0].toUpperCase() + prop.slice(1) + ":</b> ";    
                    labelDato.classList.add("mr-4");
                    
                    divAreaPersonal.appendChild(labelDato);
                }
                var inputDato=document.createElement("input");
                if(prop=="id")
                    inputDato.type="hidden";
                if(prop=="numeroHoras")
                    inputDato.type="number";
                inputDato.classList.add("text-center")
                inputDato.value=usuarioLogueado[prop];
                inputDato.disabled=true;
                inputDato.id=prop+"AEditar";
                var br= document.createElement("br");


                divAreaPersonal.appendChild(inputDato);
                divAreaPersonal.appendChild(br);


            }


            }

            divAreaPersonal.appendChild(document.createElement("br"));
            var botonEditarDatosUsuario= document.createElement("button");
            botonEditarDatosUsuario.classList.add("btn");
            botonEditarDatosUsuario.classList.add("btn-primary");
            botonEditarDatosUsuario.classList.add("mr-4");
            botonEditarDatosUsuario.id="botonPolivalente";
            botonEditarDatosUsuario.innerHTML="Editar Datos";
            botonEditarDatosUsuario.addEventListener("click",cambiaInputsParaEditarUsuario);
            divAreaPersonal.appendChild(botonEditarDatosUsuario);

            var botonEditarDatosUsuario= document.createElement("button");
            botonEditarDatosUsuario.classList.add("btn");
            botonEditarDatosUsuario.classList.add("btn-success");
            botonEditarDatosUsuario.classList.add("mr-4");
            botonEditarDatosUsuario.classList.add("escondelo");
            botonEditarDatosUsuario.id="enviarDefinitivo";
            botonEditarDatosUsuario.innerHTML="Editar Datos";
            botonEditarDatosUsuario.addEventListener("click",enviarEdicion);
            botonEditarDatosUsuario.addEventListener("click",cambiaInputsParaEditarUsuario);
            divAreaPersonal.appendChild(botonEditarDatosUsuario);

            var botonCancelarEdicionUsuario= document.createElement("button");
            botonCancelarEdicionUsuario.classList.add("btn");
            botonCancelarEdicionUsuario.id="botonCancelarEdicionUsuario";
            botonCancelarEdicionUsuario.classList.add("btn-danger");
            
            botonCancelarEdicionUsuario.addEventListener("click",cambiaInputsParaEditarUsuario);
            botonCancelarEdicionUsuario.classList.add("escondelo");
            botonCancelarEdicionUsuario.innerHTML="Cancelar Edicion";
            divAreaPersonal.appendChild(botonCancelarEdicionUsuario);






        }

        //se efectúa la edicion del usuario
        function enviarEdicion(){           
            usuarioLogueado.email=document.getElementById("emailAEditar").value;
            usuarioLogueado.nombre=document.getElementById("nombreAEditar").value;
            usuarioLogueado.apellido1=document.getElementById("apellido1AEditar").value;
            usuarioLogueado.apellido2=document.getElementById("apellido2AEditar").value;
            usuarioLogueado.grupoMusica=document.getElementById("grupoMusicaAEditar").value;
            usuarioLogueado.dni=document.getElementById("dniAEditar").value;
            usuarioLogueado.direccion=document.getElementById("direccionAEditar").value;
            usuarioLogueado.numeroHoras=parseInt(document.getElementById("numeroHorasAEditar").value);
            
        }

        //cambia los inputs de disable=true a disable=false
    
        function cambiaInputsParaEditarUsuario(){
            var inputs =  document.getElementById("divAreaPersonal").getElementsByTagName("input");
            for (let i = 0; i < inputs.length-1; i++) {
               inputs[i].disabled=!(inputs[i].disabled);
            }
            
            document.getElementById("botonCancelarEdicionUsuario").classList.toggle("escondelo");            
            document.getElementById("enviarDefinitivo").classList.toggle("escondelo");
            document.getElementById("botonPolivalente").classList.toggle("escondelo");
        }

        //oculta el div general(carousel) y el div de datos personales para mostrar el div donde se gestionan las salas
        function verSalas() {
            document.getElementById("general").style.display = "none";
            document.getElementById("divSalas").style.display = "block";

            document.getElementById("divAreaPersonal").style.display = "none";

        }

        //se crean dinamicamente los elementos del carrosel, cogiendo sólo las salas disponibles.
        //se fijan clases bootstrap para conseguir el efecto deseado
        function cargaCarrusel() {
            var olBoot = document.getElementById("olBoot");
            var salasDisponibles = listaSalas.filter(sal => (sal.estaDisponible == true && sal.estaOculta == false));
            for (let i = 0; i < salasDisponibles.length - 1; i++) {
                olBoot.innerHTML += "<li data-target='#carouselExampleCaptions' data-slide-to=" + (i + 1) + "></li>";
            }

            var divCarrusel = document.getElementById("carruselDisponibles");
            var itemsBoot = document.getElementById("itemsBoot");

            for (let i = 0; i < salasDisponibles.length; i++) {
                var div = document.createElement("div");
                div.classList.add("carousel-item");
                if (i == 0) div.classList.add("active");
                var img = document.createElement("img");
                img.classList.add("d-block");
                img.classList.add("w-100");
                img.src = "/img/sala" + (i + 1) + ".jpg";
                var divCont = document.createElement("div");
                divCont.classList.add("carousel-caption");
                divCont.classList.add("d-none");
                divCont.classList.add("d-md-block");
                var h5 = document.createElement("h4");
                h5.innerHTML = "SALA: " + salasDisponibles[i].nombre;
                h5.innerHTML += " - Precio/hora: " + salasDisponibles[i].precioHora + " €";
                h5.innerHTML += " - Capacidad: " + salasDisponibles[i].maximoPersonas() + " p";
                divCont.appendChild(h5);
                divCont.innerHTML += "<a onclick='verSalas(); cargaSalas()' class='btn btn-lg btn-primary' href='javascript: void(0)' role='button'>Reservar</a>";
                div.appendChild(img);
                div.appendChild(divCont);
                itemsBoot.appendChild(div);
            }

        }

        //carga los datos de las salas en la capa donde se visualizan las salas
        function cargaSalas() {
            document.getElementById("divSalas").innerHTML = "";
            var divSalas = document.getElementById("divSalas")
            var salasDisponibles = listaSalas.filter(sal => (sal.estaOculta == false));
            salasDisponibles.forEach(sala => {
                var div = document.createElement("div");
                div.classList.add("card");
                div.classList.add("border-primary");
                div.classList.add("mb-3");
                div.classList.add("col-3");
                div.classList.add("mr-2");
                div.style = "max-width: 18rem;float: left;"
                div.sala = sala;
                var p = document.createElement("p");
                p.innerHTML = "SALA: " + sala.nombre;
                div.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Precio por Hora: " + sala.precioHora + " €";
                div.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Capacidad : " + sala.maximoPersonas() + " persona/s";
                div.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Equipado : ";
                p.innerHTML += (sala.equipado) ? "SI" : "NO";
                div.appendChild(p)
                var botonReserva = document.createElement("button");
                botonReserva.innerHTML = "Resérvala";
                botonReserva.addEventListener("click", reservarSala)
                if (sala.estaDisponible == false) {
                    botonReserva.disabled = true;
                    div.classList.add("border-danger");
                }
                div.appendChild(botonReserva);
                divSalas.appendChild(div);

            });


        }

        //carga los datos de la sala que se quiere reservar.
        //se crea un div con estos datos y un input para establecer los horarios de reserva.
        //se incluyen botones para efectuar la reserva o cancelar el intento de reserva
        function reservarSala(event) {

            if (!usuarioLogueado)
                alert("¡Tienes que estar logueado para poder reservar!")
            else {
                document.getElementById("salaInd").innerHTML = "";
                var salaAReservar = event.target.parentNode.sala;
                var divSalaInd = document.getElementById("salaInd");
                var h3 = document.createElement("h3");
                divSalaInd.appendChild(h3);
                h3.innerHTML = "DATOS DE SALA:";
                var p = document.createElement("p");
                p.innerHTML = "Nombre: " + salaAReservar.nombre;
                divSalaInd.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Dimesiones: " + salaAReservar.metros2 + " m<sup>2</sup>";
                divSalaInd.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Capacidad Max.: " + salaAReservar.maximoPersonas() + " pers.";
                divSalaInd.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Precio/hora: " + salaAReservar.precioHora + " €";
                divSalaInd.appendChild(p);
                var label = document.createElement("label");
                label.innerHTML = "Horas:";
                label.for = "horas";
                divSalaInd.appendChild(label);
                var input = document.createElement("input");
                input.type = "number";
                input.value = "0";
                input.id = "horas";
                input.idSala = salaAReservar.id;
                input.precioHora = salaAReservar.precioHora;
                input.addEventListener("keyup", calculaPrecio);
                input.name = "horasAReservar";
                divSalaInd.appendChild(input);
                var precio = document.createElement("p");
                precio.innerHTML = "Precio Final:";
                divSalaInd.appendChild(precio);
                var coste = document.createElement("span");
                coste.id = "coste";
                coste.innerHTML = "0";
                precio.appendChild(coste);
                precio.innerHTML += " €";

                var botonReserva = document.createElement("button");
                botonReserva.innerHTML = "Completar Reserva!";
                botonReserva.addEventListener("click", efectuarReserva);
                divSalaInd.appendChild(botonReserva);

                var botonCancelar = document.createElement("button");
                botonCancelar.innerHTML = "Cancelar";
                botonCancelar.addEventListener("click", borrarIntentoReserva);
                divSalaInd.appendChild(botonCancelar);
            }
        }

        //recupera los valores del div de reserva de sala. la sala pasa a no disponible
        // y se le añade la reserva al usuario.
        function efectuarReserva() {
            var idSala = parseInt(document.getElementById("horas").idSala);
            var coste = parseInt(document.getElementById("coste").innerHTML);
            var horas = parseInt(document.getElementById("horas").value);

            if (parseInt(horas) < 1) {
                alert("Tienes que seleccionar al menos 1 hora!");
            } else {
                var objetoSala = listaSalas.filter(sala => sala.id == idSala)[0];
                objetoSala.cambiaDisponibilidad();
                usuarioLogueado.reservaSala(idSala, horas);
                alert("enhorabuena Has reservado la sala " + idSala + " por el precio de " + coste +
                    " €. Al llegar, deberás pagar en recepción. Gracias!");

                borrarIntentoReserva();
                cargaSalas();
            }
        }

        //calcula el precio de la reserva
        function calculaPrecio(event) {
            var numeroHoras = document.getElementById("horas").value;
            document.getElementById("coste").innerHTML = (event.target.precioHora) * (parseInt(numeroHoras));
        }

        function borrarIntentoReserva() {
            document.getElementById("salaInd").innerHTML = "";
        }