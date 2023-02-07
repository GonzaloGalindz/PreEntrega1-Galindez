class Usuario {
  constructor(nombre, apellido, correo, telefono, modoAnimado) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.telefono = telefono;
    this.modoAnimado = modoAnimado;
  }
  setNombre(nuevoNombre) {
    if (nombre != "") {
      this.nombre = nuevoNombre;
    }
  }
  setApellido(nuevoApellido) {
    if (this.apellido != "") {
      this.apellido = nuevoApellido;
    }
  }
  setCorreo(nuevoCorreo) {
    if (this.correo != "") {
      this.correo = nuevoCorreo;
    }
  }
  setTelefono(nuevoTelefono) {
    if (telefono != "") {
      this.telefono = nuevoTelefono;
    }
  }
  setModoAnimado(nuevoModo) {
    this.modoAnimado = nuevoModo;
  }
}

// let plantillaModoOscuro = `<div class="inputSwitch">
//                             <label class="etiquetaDeInput"><b>Modo Oscuro</b></label>
//                             <label class="switch">
//                                 <input type="checkbox" id="modoOscuro">
//                                 <span class="slider round"></span>
//                             </label>
//                             </div>`;

// let plantillaDatosUsuario = `<div id="datosUsuario">
//                                 <label class="etiquetaDeInput" for="nombre"><b>Nombre</b></label>
//                                 <input id="inputNombre" type="text" placeholder="Nombre" name="nombre" required>
//                                 ${plantillaModoOscuro}
//                             </div>`;

let objectLocalStorage = JSON.parse(localStorage.getItem("usuario")); //busco en localStorage el objeto y hago un parse para que JS me devuelva un objeto

console.log("objectLocalStorage ===>");
console.log(objectLocalStorage);

if (objectLocalStorage) {
  //Si Nombre tiene contenido, entonces lo muestro
  let usuario = new Usuario(
    objectLocalStorage.nombre,
    objectLocalStorage.apellido,
    objectLocalStorage.correo,
    objectLocalStorage.telefono,
    objectLocalStorage.modoAnimado
  );

  console.log("usuario ===>");
  console.log(usuario);

  asignarValoresAlosInputs(usuario);
  activarModoAnimado(objectLocalStorage.modoAnimado);
} else {
  let usuario = new Usuario("", false);
  asignarValoresAlosInputs(usuario);
}

document
  .getElementById("modoAnimado")
  .addEventListener("change", activarModoAnimado); //Escucho cuando hay cambios en el check de modo animado
document
  .getElementById("formGuardarUsuario")
  .addEventListener("submit", guardarUsuario);
document.getElementById("recargar").addEventListener("click", () => {
  location.reload(); //Con este metodo podemos recargar la pagina
});
function guardarUsuario(e) {
  //Cancelamos el comportamiento del evento
  e.preventDefault();
  let valorInputNombre = document.getElementById("inputNombre").value;
  let valorInputApellido = document.getElementById("inputApellido").value;
  let valorInputCorreo = document.getElementById("inputCorreo").value;
  let valorInputTelefono = document.getElementById("inputTelefono").value;
  let valorInputModoAnimado = document.getElementById("modoAnimado").checked;
  localStorage.setItem(
    "usuario",
    JSON.stringify({
      nombre: valorInputNombre,
      apellido: valorInputApellido,
      correo: valorInputCorreo,
      telefono: valorInputTelefono,
      modoAnimado: valorInputModoAnimado,
    })
  );
}

function activarModoAnimado() {
  if (document.getElementById("modoAnimado").checked) {
    document.body.className = "animado";
  } else {
    document.body.removeAttribute("class");
  }
}

function asignarValoresAlosInputs(usuario) {
  if (
    usuario.nombre != "" &&
    usuario.apellido != "" &&
    usuario.correo != "" &&
    usuario.telefono != ""
  ) {
    document.getElementById(
      "bienvenida"
    ).innerHTML = `Hola de nuevo ${usuario.nombre} ${usuario.apellido}, te enviaremos un codigo al numero ${usuario.telefono} para habilitar el correo ${usuario.correo}`;
    document.getElementById("inputNombre").value = usuario.nombre;
    document.getElementById("inputApellido").value = usuario.apellido;
    document.getElementById("inputCorreo").value = usuario.correo;
    document.getElementById("inputTelefono").value = usuario.telefono;
    document.getElementById("modoAnimado").checked = usuario.modoAnimado;
  } else {
    document.getElementById(
      "bienvenida"
    ).innerHTML = `Hola, por favor dinos tus datos para habilitar este usuario`;
  }
}
