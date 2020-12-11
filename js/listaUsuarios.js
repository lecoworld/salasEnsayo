listaUsuarios=[];

//usuarios
listaUsuarios.push(new Cliente("U1","123456","Pedro","Moroso","Jiménez","pedro@gmail.com","12345687a","c/ felicidad 21"));
listaUsuarios.push(new Cliente("U2","123456","Carlos","Jiménez","Endrino","carlos@gmail.com","12345687b","c/ serrano 21"));
listaUsuarios.push(new Cliente("U3","123456","Fernando","Cisneros","de la Fuente","fernando@gmail.com","12345687c","c/ colon 21"));
listaUsuarios.push(new Cliente("U4","123456","Maria","Sánchez","López","maria@gmail.com","12345687d","c/ atocha 21"));
listaUsuarios.push(new Cliente("U5","123456","Noelia","Pérez","Murillo","noelia@gmail.com","12345687e","av. de la ONU 21"));
listaUsuarios.push(new Cliente("U6","123456","Isabel","Tapia","Montes","isabel@gmail.com","12345687f","c/ constitución 21"));
listaUsuarios.push(new Cliente("U7","123456","Jose","Montero","Bravo","jose@gmail.com","12345687g","c/ cervantes 21"));

//admins
listaUsuarios.push(new Cliente("A1","admin","Almudena","Asenjo","Tapia","almudena@admin.com","98765431x","c/codorniz 9",true));
listaUsuarios.push(new Cliente("A2","admin","Diego","Leiva","Contreras","diego@admin.com","98765431y","c/codorniz 9",true));

listaUsuarios[0].hazloMoroso();

//reservas
listaUsuarios[3].reservaSala(5,3);
listaUsuarios[4].reservaSala(10,4);
listaUsuarios[6].reservaSala(7,2);

