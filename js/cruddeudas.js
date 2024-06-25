function guardar(deudor) {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");

  for (let i = 0; i < deudores.length; i++) {
    if (deudor.value == deudores[i].nombre) {

        deudaActual = document.getElementById("deudaActual");

        deudores[i].deuda = deudaActual.value
        console.log(deudor[i].deuda)
    }
  }
  localStorage.setItem("deudores", JSON.stringify(deudores));

  nuevo()
  alert("Cambios Guardados")
}

function mostarDeuda(deudor) {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");

  for (let i = 0; i < deudores.length; i++) {
    if (deudor.value == deudores[i].nombre) {
      deudaActual = document.getElementById("deudaActual");
      deudaActual.value = deudores[i].deuda;
    }
  }
  nuevo()
}

function restarSaldo(deudor) {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");

  for (let i = 0; i < deudores.length; i++) {
    if (deudor.value == deudores[i].nombre) {
      valorAModificar = document.getElementById("valorAModificar");
      deudaActual = document.getElementById("deudaActual");
      deudaActual.value = deudaActual.value - valorAModificar.value;

      if (deudaActual.value < 0) {
        deudaActual.value = 0;
      }
    }
  }
  nuevo()
}

function sumarSaldo(deudor) {
  deudores = JSON.parse(localStorage.getItem("deudores") || "[]");

  for (let i = 0; i < deudores.length; i++) {
    if (deudor.value == deudores[i].nombre) {
      valorAModificar = document.getElementById("valorAModificar");
      deudaActual = document.getElementById("deudaActual");
      deudaActual.value =
        parseFloat(deudaActual.value) + parseFloat(valorAModificar.value);

      if (deudaActual.value < 0) {
        deudaActual.value = 0;
      }
    }
  }
  nuevo()
}

function nuevo() {
  valorAModificar = document.getElementById("valorAModificar");
  valorAModificar.value = ""
   valorAModificar.focus()
}
