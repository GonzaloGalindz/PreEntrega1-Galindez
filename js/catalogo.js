async function cargarProductos() {
  let Indumentarias;

  try {
    const response = await fetch("../js/Indumentarias.json");
    const data = await response.json();
    Indumentarias = data;
  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
  }
  setTimeout(() => {
    renderizarTarjetas(Indumentarias);
    document.getElementById("loader-productos").style.display = "none";
  }, 2000);
}

function renderizarTarjetas(Indumentarias) {
  for (let Indumentaria of Indumentarias) {
    let contenedor = document.getElementById("contenedor-productos");
    let elemento = document.createElement("div");
    elemento.classList.add("col-6", "col-md-4", "col-lg-3", "col-xl-2");
    let unidades = '<select class="cantidad-producto">';

    for (let i = 1; i <= 20; i++) {
      unidades += `<option value="${i}">${i}</option>`;
    }

    unidades += "</select>";
    elemento.innerHTML = `
                <div class="cards__element">
                <div class="cards__element__img__container">
                    <img src=${Indumentaria.imagen}
                    class="cards__element__image" id="myImg">
                    <div id="myModal" class="modal">
                    <span class="close">&times;</span>
                    <img class="modal-content" id="img01">
                    <div id="caption"></div>
                    </div>
                    </div>
                <h3 class="cards__element__name" id="nombre">${
                  Indumentaria.nombre
                }</h3>
                <h5 class="cards__element__price" id="precio">$ ${parseFloat(
                  Indumentaria.precio
                ).toFixed(2)}</h5>
                <p class="cards__element__cantidad d-inline" id="cantidad">Selecciona la cantidad ${unidades}</p>
                <btn class="cards__button agregar-btn" id="agregar${
                  Indumentaria.articulo
                }">
                    Agregar al carrito
                    <i class="bi bi-bag2"></i>
                </btn>
                </div>
    `;

    let btnAgregar = elemento.getElementsByClassName("agregar-btn")[0];
    btnAgregar.addEventListener("click", function () {
      carrito.agregarProducto(
        Indumentaria.articulo,
        Indumentaria.nombre,
        Indumentaria.precio,
        parseInt(elemento.getElementsByClassName("cantidad-producto")[0].value)
      );

      Toastify({
        text: "Añadido al Carrito",
        duration: 2500,
        position: "right",
        gravity: "bottom",
        className: "mensaje-producto-agregado",
        style: {
          background: "black",
          color: "#51f7f7",
        },
      }).showToast();
    });

    contenedor.appendChild(elemento);
  }
}
cargarProductos();

function cambiarImagenCarrito() {
  const imagenCarrito = document.getElementById("imagen-carrito");

  if (carrito.Indumentarias.length === 0) {
    imagenCarrito.src = "../img/cart.png";
  } else {
    imagenCarrito.src = "../img/cart-ok.png";
  }
}

const carrito = {
  Indumentarias: [],

  agregarProducto: function (articulo, nombre, precio, cantidad) {
    let IndumentariaEnStock = this.Indumentarias.find(
      (Indumentaria) => Indumentaria.articulo === articulo
    );
    if (IndumentariaEnStock) {
      let index = this.Indumentarias.indexOf(IndumentariaEnStock);
      this.Indumentarias[index].cantidad += cantidad;
    } else {
      this.Indumentarias.push({ articulo, nombre, precio, cantidad });
    }
    cambiarImagenCarrito();
    this.guardarLocalStorage();
    this.eliminarIndumentariaACero();
  },

  guardarLocalStorage: function () {
    localStorage.setItem("carrito", JSON.stringify(this.Indumentarias));
    const imagenCarrito = document.getElementById("imagen-carrito");
    localStorage.setItem("imagenCarrito", imagenCarrito.src);
  },

  recuperarLocalStorage: function () {
    if (localStorage.getItem("carrito")) {
      this.Indumentarias = JSON.parse(localStorage.getItem("carrito"));
    }

    if (localStorage.getItem("imagenCarrito")) {
      const imagenCarrito = document.getElementById("imagen-carrito");
      imagenCarrito.src = localStorage.getItem("imagenCarrito");
    }
  },

  eliminarIndumentariaACero: function () {
    this.Indumentarias = this.Indumentarias.filter(
      (Indumentaria) => Indumentaria.cantidad > 0
    );
    this.guardarLocalStorage();
  },
};
let botones = document.getElementsByClassName("agregar-btn");
for (let boton of botones) {
  boton.addEventListener("click", function () {
    let nombre = this.parentNode.querySelector("#nombre").textContent;
    let precio = parseFloat(
      this.parentNode.querySelector("#precio").textContent.split("$ ")[1]
    );
    let articulo = parseInt(
      this.parentNode.querySelector("#articulo").textContent.split("Cód.")[1]
    );
    let cantidad = parseInt(
      this.parentNode.querySelector(".cantidad-producto").value
    );
    carrito.agregarProducto(articulo, nombre, precio, cantidad);
  });
}

carrito.recuperarLocalStorage();

let modal = document.createElement("div");
modal.id = "modal-carrito";
modal.className = "modal";
modal.classList.add("container-fluid");
modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h2>Detalles de la compra</h2>
            <span class="close-modal">&times;</span>
        </div>
        <div class="modal-body">
            <table id="tabla-carrito">
                <thead>
                    <tr>
                        <th></th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="cuerpo-tabla"></tbody>
            </table>
            <div id="total-compra"></div>
        </div>
        <div class="modal-footer">
            <div id="vaciar-carrito" class="cards__button">Vaciar carrito</div>
            <div id="comprar" class="cards__button">Comprar</div>
        </div>
    </div>
`;

document.body.appendChild(modal);

let imagenCarrito = document.getElementById("imagen-carrito");
imagenCarrito.addEventListener("click", function () {
  if (carrito.Indumentarias.length > 0) {
    modal.style.display = "block";

    let cuerpoTabla = document.getElementById("cuerpo-tabla");
    cuerpoTabla.innerHTML = "";
    let totalCompra = 0;
    for (let Indumentaria of carrito.Indumentarias) {
      let fila = document.createElement("tr");
      fila.innerHTML = `
                <td><img src="../img/Articulo${
                  Indumentaria.articulo
                }.webp" width="50" height="50"></td>
                <td class="modal-nombre">${Indumentaria.nombre}</td>
                <td class="modal-precio">$ ${Indumentaria.precio}</td>
                <td class="modal-cantidad">${Indumentaria.cantidad}</td>
                <td class="modal-precio">$ ${
                  Indumentaria.precio * Indumentaria.cantidad
                }</td>
            `;
      cuerpoTabla.appendChild(fila);
      totalCompra += Indumentaria.precio * Indumentaria.cantidad;
    }

    let totalCompraDiv = document.getElementById("total-compra");
    totalCompraDiv.innerHTML = `<h3 class="total-compra">Total de la compra: $ ${totalCompra}</h3>`;
  }
});

const closeModal = document.querySelector(".close-modal");

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

document.addEventListener("mousedown", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function comprarCarrito() {
  carrito.Indumentarias = [];
  cambiarImagenCarrito();
  carrito.guardarLocalStorage();
  Swal.fire({
    background: "black",
    icon: "success",
    title: "Compra realizada con exito!",
    confirmButtonColor: "#018f8f",
  });
  modal.style.display = "none";
}
document.getElementById("comprar").addEventListener("click", comprarCarrito);

function vaciarCarrito() {
  carrito.Indumentarias = [];
  cambiarImagenCarrito();
  carrito.guardarLocalStorage();
  Swal.fire({
    confirmButtonColor: "#018f8f",
    title: "Carrito vaciado con éxito!",
  });
  modal.style.display = "none";
}
document
  .getElementById("vaciar-carrito")
  .addEventListener("click", vaciarCarrito);
