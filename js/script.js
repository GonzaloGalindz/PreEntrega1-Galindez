// document.getElementById("loader").style.display = "none";

class Usuario {
  constructor(usuario, contraseña, correo) {
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.correo = correo;
  }
  setNombre(nuevoUsuario) {
    if (usuario != "") {
      this.usuario = nuevoUsuario;
    }
  }
  setApellido(nuevaContraseña) {
    if (this.contraseña != "") {
      this.contraseña = nuevaContraseña;
    }
  }
  setCorreo(nuevoCorreo) {
    if (this.correo != "") {
      this.correo = nuevoCorreo;
    }
  }
}

let objectLocalStorage = JSON.parse(localStorage.getItem("usuario"));
console.log("objectLocalStorage ===>");
console.log(objectLocalStorage);

if (objectLocalStorage) {
  let usuario = new Usuario(
    objectLocalStorage.usuario,
    objectLocalStorage.contraseña,
    objectLocalStorage.correo
  );
  console.log("usuario ===>");
  console.log(usuario);

  asignarValoresAlosInputs(usuario);
} else {
  let usuario = new Usuario("", false);
  asignarValoresAlosInputs(usuario);
}

// document.getElementById("inputUsuario").value = "";
// document.getElementById("inputContraseña").value = "";
// document.getElementById("inputCorreo").value = "";
document
  .getElementById("formGuardarusuario")
  .addEventListener("submit", guardarUsuario());
document.getElementById("recargar").addEventListener("click", () => {
  location.reload();
});

function guardarUsuario(e) {
  e.preventDefault();
  let valorInputUsuario = document.getElementById("inputUsuario").value;
  let valorInputContraseña = document.getElementById("inputContraseña").value;
  let valorInputCorreo = document.getElementById("inputCorreo").value;
  localStorage.setItem(
    "usuario",
    JSON.stringify({
      usuario: valorInputUsuario,
      contraseña: valorInputContraseña,
      correo: valorInputCorreo,
    })
  );
  grabarDatosServer({
    userId: valorInputUsuario,
    userCorreo: valorInputCorreo,
  });
}

function asignarValoresAlosInputs(usuario) {
  if (
    usuario.usuario != "" &&
    usuario.contraseña != "" &&
    usuario.correo != ""
  ) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario registrado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    // Swal.fire({
    //   position: "center",
    //   icon: "error",
    //   title: "No se pudo registrar el usuario",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  }
}
