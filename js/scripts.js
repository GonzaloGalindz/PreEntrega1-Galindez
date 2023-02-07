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

let objectLocalStorage = JSON.parse(localStorage.getItem("usuario"));

console.log("objectLocalStorage ===>");
console.log(objectLocalStorage);

if (objectLocalStorage) {
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

document.getElementById("inputNombre").value = "";
document.getElementById("inputApellido").value = "";
document.getElementById("inputTelefono").value = "";
document.getElementById("inputCorreo").value = "";
document
  .getElementById("modoAnimado")
  .addEventListener("change", activarModoAnimado);
document
  .getElementById("formGuardarUsuario")
  .addEventListener("submit", guardarUsuario);
document.getElementById("recargar").addEventListener("click", () => {
  location.reload();
});

function guardarUsuario(e) {
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
