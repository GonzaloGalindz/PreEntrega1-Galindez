// PRE-ENTREGA 1

// // Algoritmo con un condicional y utilizando un ciclo
// let talle = prompt("Ingrese su talle de ropa");
// console.log(talle);
// while (
//   talle.toLowerCase() != "s" &&
//   talle.toLowerCase() != "m" &&
//   talle.toLowerCase() != "l" &&
//   talle.toLowerCase() != "xl"
// ) {
//   alert("Por favor ingrese un talle");
//   talle = prompt("Ingrese su talle de ropa");
// }
// if (talle.toLowerCase() == "s") {
//   alert("Elegiste el talle " + talle.toUpperCase());
// } else if (talle.toLowerCase() == "m") {
//   alert("Elegiste el talle " + talle.toUpperCase());
// } else if (talle.toLowerCase() == "l") {
//   alert("Elegiste el talle " + talle.toUpperCase());
// } else talle.toLowerCase() == "xl";
// alert("Elegiste el talle " + talle.toUpperCase());

// // Simulador de compra interactivo
// let pago = Number(
//   prompt("Ingrese el valor pagado por la venta de la indumentaria")
// );
// let venta = Number(
//   prompt("Ingrese el valor de costo por la venta de la indumentaria")
// );
// if (pago > venta) {
//   console.log("Devolucion en pesos de: $" + (pago - venta));
//   alert("Devolucion en pesos de: $" + (pago - venta));
// } else if (pago < venta) {
//   console.log("Falta por cancelar: $" + (venta - pago));
//   alert("Falta por cancelar: $" + (venta - pago));
// } else {
//   console.log("La cantidad pagada fue exacta");
//   alert("La cantidad pagada fue exacta");
// }

// PRE-ENTREGA 2

class Ropa {
  constructor(tipo, talle, precio) {
    this.tipo = tipo;
    this.talle = talle;
    this.precio = precio;
  }
  muestra() {
    console.log(
      "Elegiste un " +
        this.tipo +
        ", talle: " +
        this.talle +
        ". Su precio es de: $" +
        this.precio
    );
  }
}

const buzo = new Ropa("Buzo", "L", "4750");
const pantalon = new Ropa("Pantalon", "M", "7499");
const zapatillas = new Ropa("Zapatillas", "44", "12150");

let ropaElegida = prompt("Inserte la indumentaria a elegir").toLowerCase();
while (
  ropaElegida != "buzo" &&
  ropaElegida != "pantalon" &&
  ropaElegida != "zapatillas"
) {
  ropaElegida = prompt("Por favor, inserte una indumentaria").toLowerCase();
}
if (ropaElegida == "buzo") {
  buzo.muestra();
} else if (ropaElegida == "pantalon") {
  pantalon.muestra();
} else if (ropaElegida == "zapatillas") {
  zapatillas.muestra();
}

//ARRAYS
const marcasStock = [
  { Nombre: "Adidas", Precio: 12000 },
  { Nombre: "Nike", Precio: 15000 },
  { Nombre: "Fila", Precio: 10500 },
];
const marcasSinStock = [
  { Nombre: "Puma", Precio: 11000 },
  { Nombre: "New Balance", Precio: 9700 },
  { Nombre: "Converse", Precio: 9300 },
];
const marcasALaVenta = marcasStock.concat(marcasSinStock);

const marcas = marcasALaVenta.map((marca) => {
  return {
    nombre: marca.Nombre,
    precio: marca.Precio * 1.21,
  };
});
console.log(marcas);

let marcasCaras = "";
marcasCaras = marcasALaVenta.filter((marca) => marca.Precio > 10999);
console.log(marcasCaras);

let marcasBaratas = "";
marcasBaratas = marcasALaVenta.filter((marca) => marca.Precio < 10999);
console.log(marcasBaratas);
