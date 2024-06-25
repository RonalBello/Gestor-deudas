idTemporal = 0;

function guardar() {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");
  nombre = document.getElementById("nombre");

  let existe = deudores.findIndex((deudor) => deudor.id == idTemporal);

  if (existe !== -1) {
    actualizar(idTemporal);
  } else {
    id = Date.now();

    deuda = 0;

    deudor = new Deudor(id, nombre.value, deuda);

    deudores.push(deudor);
    localStorage.setItem("deudores", JSON.stringify(deudores));
    console.log(deudores)
  }

  cargarTabla()
  nuevo()
  idTemporal = 0;

}

function cargarTabla() {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");
  tablaDeudores = document.getElementById("tablaDeudores");

  tablaDeudores.innerText = "";

  for (let i = 0; i < deudores.length; i++) {
    fila = document.createElement("tr");

    id = document.createElement("td");
    id.textContent = deudores[i].id;
    id.classList.add("oculto");

    nombre = document.createElement("td");
    nombre.textContent = deudores[i].nombre;

    botones = document.createElement("td");
    botonActualizar = document.createElement("button");
    botonActualizar.addEventListener("click", mostrarDatos);
    botonActualizar.textContent = "Actualizar";

    botonEliminar = document.createElement("button");
    botonEliminar.addEventListener("click", eliminar);
    botonEliminar.textContent = "Eliminar";

    botones.appendChild(botonActualizar);
    botones.appendChild(botonEliminar);

    fila.appendChild(id);
    fila.appendChild(nombre);
    fila.appendChild(botones);
    tablaDeudores.appendChild(fila);
  }
}

function actualizar(id) {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");

  for (let i = 0; i < deudores.length; i++) {
    if (id == deudores[i].id) {
      nombre = document.getElementById("nombre");

      deudores[i].nombre = nombre.value;
      break;
    }
  }

  localStorage.setItem("deudores", JSON.stringify(deudores));
}

function eliminar() {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");

  id = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < deudores.length; i++) {
    if (id == deudores[i].id) {
      deudores.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("deudores", JSON.stringify(deudores));
  cargarTabla()
  nuevo()
}

function mostrarDatos() {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");

  id = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < deudores.length; i++) {
    if (id == deudores[i].id) {
      nombre = document.getElementById("nombre");

      nombre.value = deudores[i].nombre;
    }
  }

  idTemporal = id;
}

function nuevo() {
    nombre = document.getElementById("nombre")
    nombre.value = ""
    nombre.focus()
}

function borrarDatos() {
  localStorage.removeItem("deudores");
}
