var listaEgresos = [];
var listaViajes = [];
var totalEgreso = 0;


function crearListaEgresos() {
  nombre = document.getElementById("nombreEgreso").value;
  valor = document.getElementById("valorEgreso").value;

  if (nombre == "" || valor == "") {
    alert("Por favor llene todos los campos");
    return;
  }

  egreso = new Egresos(nombre, valor);

  listaEgresos.push(egreso);

  nombre.value = "";
  valor.value = "";

  tablaEgresos = document.getElementById("egresosPorViaje");

  tablaEgresos.innerHTML = "";
  for (var i = 0; i < listaEgresos.length; i++) {
    fila = document.createElement("tr");
    columnaNombre = document.createElement("td");
    columnaValor = document.createElement("td");
    columnaNombre.innerHTML = listaEgresos[i].tipo;
    columnaValor.innerHTML = listaEgresos[i].valor;

    acciones = document.createElement("td");
    botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = "Eliminar";

    botonActualizar = document.createElement("button");
    botonActualizar.innerHTML = "Actualizar";

    acciones.appendChild(botonEliminar);
    acciones.appendChild(botonActualizar);

    fila.appendChild(columnaNombre);
    fila.appendChild(columnaValor);
    fila.appendChild(acciones);

    tablaEgresos.appendChild(fila);
  }
  calcularTotalEgresos();
}

function calcularTotalEgresos() {
  totalEgreso = 0;
  mostarTotal = document.getElementById("totalEgreso");

  for (var i = 0; i < listaEgresos.length; i++) {
    totalEgreso += parseFloat(listaEgresos[i].valor);
  }

  mostarTotal.value = totalEgreso;
}

function crearListaViajes() {
  id = listaViajes.length + 1;

  fecha = document.getElementById("fechaViaje").value;
  nombre = document.getElementById("nombreViaje").value;
  valor = document.getElementById("valorViaje").value;

  if (fecha == "" || nombre == "" || valor == "") {
    alert("Por favor llene todos los campos");
    return;
  }

  viaje = new Viajes(id, fecha, nombre, valor, listaEgresos);

  listaViajes.push(viaje);

  tablaViajes = document.getElementById("viajesPorDetonacion");

  tablaViajes.innerHTML = "";
  for (var i = 0; i < listaViajes.length; i++) {
    fila = document.createElement("tr");
    id = document.createElement("td");
    id.innerHTML = listaViajes[i].id;

    id.style.display = "none";

    columnaFecha = document.createElement("td");
    columnaNombre = document.createElement("td");
    columnaValor = document.createElement("td");
    columnaFecha.innerHTML = listaViajes[i].fecha;
    columnaNombre.innerHTML = listaViajes[i].nombre;
    columnaValor.innerHTML = listaViajes[i].valor;

    acciones = document.createElement("td");
    botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = "Eliminar";

    botonActualizar = document.createElement("button");
    botonActualizar.innerHTML = "Actualizar";

    acciones.appendChild(botonEliminar);
    acciones.appendChild(botonActualizar);

    fila.appendChild(id);
    fila.appendChild(columnaFecha);
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaValor);
    fila.appendChild(acciones);

    tablaViajes.appendChild(fila);

    tablaEgresos = document.getElementById("egresosPorViaje");
    tablaEgresos.innerHTML = "";
  }
}

function guardarDetonacion() {
  var detonaciones =
    JSON.parse(localStorage.getItem("detonaciones" || "[]")) || [];

  id = new Date().getTime();
  fecha = document.getElementById("fechaDetonacion").value;
  nombre = document.getElementById("nombreDetonacion").value;
  viajes = listaViajes;

  if (fecha == "" || nombre == "") {
    alert("Por favor llene todos los campos");
    return;
  }

  detonacion = new Detonacion(id, fecha, nombre, viajes);

  detonaciones.push(detonacion);

  localStorage.setItem("detonaciones", JSON.stringify(detonaciones));

  console.log(detonaciones);
}

function mostrarDetonaciones() {
  detonaciones = JSON.parse(localStorage.getItem("detonaciones" || "[]")) || [];

  tablaDetonaciones = document.getElementById("tablaDeDetonaciones");

  tablaDetonaciones.innerHTML = "";
  for (var i = 0; i < detonaciones.length; i++) {
    fila = document.createElement("tr");
    fila.addEventListener("click", mostrarVentanaListasViajes);
    id = document.createElement("td");
    id.innerHTML = detonaciones[i].id;

    id.style.display = "none";

    columnaFecha = document.createElement("td");
    columnaNombre = document.createElement("td");
    columnaFecha.innerHTML = detonaciones[i].fecha;
    columnaNombre.innerHTML = detonaciones[i].nombre;

    fila.appendChild(id);

    fila.appendChild(columnaNombre);
    fila.appendChild(columnaFecha);

    tablaDetonaciones.appendChild(fila);
  }
}

function mostrarVentanaListasViajes() {
  window.location = "../html/listarviajes.html?idTemporal=" + this.children[0].textContent;
}

function listarViajes() {

  tabla = document.getElementById("tablaDeViajesHechos")

  detonaciones = JSON.parse(localStorage.getItem("detonaciones" || "[]")) || [];

  for (let i = 0; i < detonaciones.length; i++) {

    id = new URLSearchParams(window.location.search).get("idTemporal")


    if (detonaciones[i].id == id) {

      viajes = detonaciones[i].viajes
      console.log(viajes);
      

      for (let j = 0; j < viajes.length; j++) {

        fila = document.createElement("tr");

        id = document.createElement("td");
        id.innerHTML = viajes[j].id;
        id.style.display = "none";

        fecha = document.createElement("td");
        fecha.innerText = viajes[j].fecha;

        nombre = document.createElement("td");
        nombre.innerText = viajes[j].nombre;

        valor = document.createElement("td");
        valor.innerText = viajes[j].valor;

        totalEgreso = 0;

        egresos = viajes[j].egeresos;
       

        for (let k = 0; k < egresos.length; k++) {
          totalEgreso += parseFloat(egresos[k].valor);
        }

        celdaTotalEgreso = document.createElement("td");
        celdaTotalEgreso.innerText = totalEgreso;

        ingreso = document.createElement("td");
        ingreso.innerText = viajes[j].valor - totalEgreso;
        
        celdaAcciones = document.createElement("td");
        celdaAcciones = document.createElement("td");
        celdaAcciones.classList.add("tdBotones");
        botonActualizar = document.createElement("button");
        botonActualizar.textContent = "Actualizar";
      

        botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
       

        celdaAcciones.appendChild(botonActualizar);
        celdaAcciones.appendChild(botonEliminar);

        fila.appendChild(id);
        fila.appendChild(fecha);
        fila.appendChild(nombre);
        fila.appendChild(valor);
        fila.appendChild(celdaTotalEgreso);
        fila.appendChild(ingreso);
        fila.appendChild(celdaAcciones);
      

        tabla.appendChild(fila);

      }
      break;
    }
  }

}