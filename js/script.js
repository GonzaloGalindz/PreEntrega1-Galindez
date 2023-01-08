// Algoritmo con un condicional y utilizando un ciclo
let talle = prompt("Ingrese su talle de ropa");
console.log(talle);
if (talle == "S" || talle == "s") {
  alert("Elegiste el talle S");
} else if (talle == "M" || talle == "m") {
  alert("Elegiste el talle M");
} else if (talle == "L" || talle == "l") {
  alert("Elegiste el talle L");
} else if (talle == "XL" || talle == "xl") {
  alert("Elegiste el talle XL");
} else {
  while (talle == "") {
    alert("Por favor ingrese un talle");
    talle = prompt("Ingrese su talle de ropa");
  }
  alert("Elegiste el talle" + " " + talle);
}

// Simulador de compra interactivo
let pago = parseFloat(
  Number(prompt("Ingrese el valor pagado por la venta de la indumentaria"))
);
let venta = parseFloat(
  Number(prompt("Ingrese el valor de costo por la venta de la indumentaria"))
);
if (pago > venta) {
  console.log("Devolucion en pesos de: $" + (pago - venta));
  alert("Devolucion en pesos de: $" + (pago - venta));
} else if (pago < venta) {
  console.log("Falta por cancelar: $" + (venta - pago));
  alert("Falta por cancelar: $" + (venta - pago));
} else {
  console.log("La cantidad pagada fue exacta");
  alert("La cantidad pagada fue exacta");
}
