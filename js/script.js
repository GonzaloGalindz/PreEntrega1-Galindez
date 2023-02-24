document.getElementById("loader").style.display = "none";

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

if (objectLocalStorage) {
  let usuario = new Usuario(
    objectLocalStorage.usuario,
    objectLocalStorage.contraseña,
    objectLocalStorage.correo
  );
  console.log(usuario);

  asignarValoresAlosInputs(usuario);
} else {
  let usuario = new Usuario("", false);
  asignarValoresAlosInputs(usuario);
}

document.getElementById("inputUsuario").value = "";
document.getElementById("inputContraseña").value = "";
document.getElementById("inputCorreo").value = "";
document
  .getElementById("formGuardarUsuario")
  .addEventListener("submit", guardarUsuario);
document.getElementById("guardar").addEventListener("click", () => {
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
  guardarUsuarioServer({
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
      timer: 1250,
    });
  } else {
    Swal.fire({
      title: "Registrate",
      text: "Creá tu usuario a continuación",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

const buscarUsuario = async (userId) => {
  document.getElementById("loader").style.display = "";
  document.getElementById("central").style.display = "none";
  const resp = await fetch(`http://127.0.0.1:5500/user/${userId}`);
  const data = await resp.json();
  if (!resp.ok) {
    mostrarMensaje({
      titulo: "¡El usuario que busca no está registrado en la pagina!",
      icono: "error",
    });

    document.getElementById("loader").style.display = "none";
    document.getElementById("central").style.display = "";
    return;
  }
  console.log(data);
  let usuario = new Usuario(data.userId, data.userCorreo);
  asignarValoresAlosInputs(usuario);
  document.getElementById("loader").style.display = "none";
  document.getElementById("central").style.display = "";
};

const guardarUsuarioServer = async (user) => {
  document.getElementById("loader").style.display = "";
  document.getElementById("central").style.display = "none";
  const resp = await fetch("http://127.0.0.1:5500/user/", {
    method: "POST",
    body: JSON.stringify({
      userId: user.userId,
      userCorreo: user.userCorreo,
    }),
  });
  const data = await resp.json();
  if (resp.ok) {
    mostrarMensaje({
      titulo: "¡El usuario se registro correctamente!",
      icono: "success",
    });
  } else {
    console.log(data);
    mostrarMensaje({
      titulo: "¡Ocurrió un error al registrar el usuario!",
      icono: "error",
    });
  }
  return data;
};

document.getElementById("reiniciar").addEventListener("click", () => {
  document.getElementById("inputUsuario").value = "";
  document.getElementById("inputContraseña").value = "";
  document.getElementById("inputCorreo").value = "";
});
