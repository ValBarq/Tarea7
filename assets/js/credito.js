let botonCalcular = document.getElementById("btnCalcular");
let rangoPlazo = document.getElementById("plazo");
let inpFecha = document.getElementById("fecha");

document.getElementById("apto").style.visibility = "hidden";

function calcular() {
    let montoSolicitar, tasaIn, rangoP, email, salario, valorVivienda, nombre;
    montoSolicitar= Number.parseFloat(document.getElementById("montoSol").value);
    tasaIn = Number.parseFloat(document.getElementById("interes").value) / 100;
    rangoP = Number.parseInt(document.getElementById("plazo").value) * 12;
    salario = Number.parseFloat(document.getElementById("salario").value);
    valorVivienda = Number.parseFloat(document.getElementById("valVivienda").value);
    email = document.getElementById("email").value;
    nombre = document.getElementById("nombre").value;
    validar(email, nombre, salario, tasaIn, valorVivienda, montoSolicitar);
    document.getElementById('output').value = output(email, nombre, new Date(inpFecha.value).toLocaleDateString(),
        salario, valorVivienda, montoSolicitar, tasaIn,  rangoP, calcularPagoMensual(montoSolicitar, tasaIn,rangoP), salario / 0.40);

}

function calcularPagoMensual( montoSolicitar, tasaIn, rangoP) {
    return ( montoSolicitar * (tasaIn /100) * Math.pow(1 + (tasaIn / 100), rangoP)) / (Math.pow(1 + (tasaIn / 100), rangoP) - 1);
}

function validar(email, nombre, salario, interes, valorVivienda, montoSol, fechaNac) {

    if (Number.isNaN(montoSol) || Number.isNaN(interes)) {
        alert("Error: formato de datos incorrecto");
        window.location.reload();
    }

    if (email === "" || nombre === "" || Number.isNaN(salario) || Number.isNaN(valorVivienda)) {
        alert("Error: algunos campos requeridos se encuentran vacios");
        window.location.reload();
    }
}

function output(email, nombre, fechaNac, salario, valorVivienda, montoSol, plazo, interes, cuota, netoReq) {
    let salida = new String();
    salida += "Correo electronico: " + email + "\n"
        + "Nombre: " + nombre + "\n"
        + "Fecha de Nacimiento: " + fechaNac + "\n"
        + "Salario neto mensual: " + salario + "\n"
        + "Valor de la vivienda: " + valorVivienda + "\n"
        + "Monto Solicitar: " + montoSol + "\n"
        + "Plazo en años: " + plazo + "\n"
        + "Tasa Interes: " + interes + "\n"
        + "Cuota: " + cuota + "\n"
        + "Ingreso Neto Requerido: " + netoReq + "\n";
    return salida;
}

botonCalcular.addEventListener("click", calcular);

rangePlazo.addEventListener("change", () => {
    document.getElementById("plazoValor").innerHTML = rangePlazo.value;
});

inpFecha.addEventListener("change", () => {
    let anioNac, anioAct, edad;

    anioNac = new Date(inpFecha.value).getFullYear();
    anioAct = new Date().getFullYear();
    edad = anioAct - anioNac;

    if (edad > 22 && edad < 55) {
        document.getElementById("apto").innerHTML = "Cliente con edad suficiente para crédito";
        document.getElementById("apto").style.visibility = "visible";

    } else {
        document.getElementById("apto").innerHTML = "Cliente no califica para crédito por edad";
        document.getElementById("apto").style.visibility = "visible";

    }
});

function valorPlazo(){
    let range = document.getElementById("plazo");
    let valor = document.getElementById("texto");

    range.oninput = () => {
        valor.innerHTML = range.value
    }
}