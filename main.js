const formularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");

formularioCalculadora.addEventListener("submit", (evento) => {
  evento.preventDefault();

  calcularCalorias();
});

function calcularCalorias() {
  aparecerResultado();

  const nombre = document.querySelector("#nombre");
  const tipo_id = document.querySelector("#tipo-documento");
  const num_id = document.querySelector("#num-id");
  const edad = document.querySelector("#edad");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const genero = document.querySelector('input[name="genero"]:checked');
  const actividad = document.querySelector("#actividad");
  // const totalCalorias = document.querySelector('#total-calorias');

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  if (
    !(nombre.value && num_id.value && edad.value && peso.value && altura.value)
  ) {
    mostrarMensajeDeError("Por favor asegúrese de llenar todos los campos");
    return;
  } else if (edad.value < 15 || edad.value > 80) {
    mostrarMensajeDeError("La edad ingresada no es permitida");
    return;
  }

  let calculoCalorias;
  if (genero.id === "hombre") {
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    calculoCalorias =
      actividad.value *
        (multiplicadorTMB.peso * peso.value +
          multiplicadorTMB.altura * altura.value -
          multiplicadorTMB.edad * edad.value) +
      5;
  } else {
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
    calculoCalorias =
      actividad.value *
        (multiplicadorTMB.peso * peso.value +
          multiplicadorTMB.altura * altura.value -
          multiplicadorTMB.edad * edad.value) -
      161;
  }

  let mensaje = "";
  if (edad.value >= 15 && edad.value <= 80) {
    if (edad.value >= 15 && edad.value <= 29) {
      mensaje = "El paciente pertenece al grupo poblacional juvenil.";
    } else if (edad.value >= 30 && edad.value <= 59) {
      mensaje = "El paciente pertenece al grupo poblacional adulto.";
    } else {
      mensaje =
        "El paciente pertenece al grupo poblacional de adultos mayores.";
    }
  }

  // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;

  resultado.innerHTML = `
    <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
        <h5 class="card-title h2">Resultado</h5>
        <div class="mb-3 w-100">
            <p>
                El paciente ${nombre.value}, identificado con ${
    tipo_id.value
  } NO. ${num_id.value} requiere un total de ${Math.floor(
    calculoCalorias
  )} kcal para el sostenimiento de su TBM.
  <br> <br>
  ${mensaje}
            </p>
                <!--<input class="form-control text-center" value="${Math.floor(
                  calculoCalorias
                )} kcal" style="font-size: 2rem" disabled>-->
            </div>
        </div>
    `;
  // Volver a limpiar variables
  nombre.value = null;
  tipo_id.value = null;
  num_id.value = null;
  peso.value = null;
  altura.value = null;
  edad.value = null;
  actividad.value = null;
}

function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector("#calculo");
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado() {
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}
