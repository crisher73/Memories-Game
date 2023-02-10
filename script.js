
// mostrar las imagenes random al presionar el boton jugar. 
let container = document.getElementById("objects-container");
let randomObjects
let arrayCopy = [] // Para obtener el nuevo orden
let timerId
let selectedValue;
let order;
let sectionEmparejar = document.getElementById("section-match");
sectionEmparejar.style.display = 'none';
let sectionValidar = document.getElementById('section-validate')
sectionValidar.style.display = 'none'
let sectionReiniciar = document.getElementById('section-reload')
sectionReiniciar.style.display = 'none'
// let sectionItem = document.getElementById("section-item");
// sectionItem.style.display = 'none';
// let sectionEmparejar = document.getElementById("section-match");
// sectionEmparejar.style.display = 'flex';

function play() {

  randomObjects = [];
  container.innerHTML = "";
  let items = document.getElementsByName("items");
  for (let i = 0; i < items.length; i++) {
    if (items[i].checked) {
      selectedValue = items[i].id;
      break;
    }
  }
  load();
}
document.getElementById("button-play").addEventListener("click", play);

function load() {
  if (selectedValue == "images") {
    //generar imagenes random
    const n = 14;
    for (let i = 0; i < 5; i++) {
      let randomImages = Math.floor(Math.random() * n) + 1;
      if (!randomObjects.includes(randomImages)) {
        let image = document.createElement("img");
        image.src = "./states/image" + randomImages + ".jpeg";
        container.appendChild(image);
        randomObjects.push(randomImages);
      } else {
        i--;
      }
    }
  } else {
    // generar palabras random 
    let text = "Amar Reir felicidad Retos Vivir Viajar Alegría Dormir Comer Hermoso Amigos Postres Desayuno Fiesta Montaña";
    let someWords = text.split(" ");
    for (let i = 0; i < 5; i++) {
      var randomIndex = Math.floor(Math.random() * someWords.length);
      if (!randomObjects.includes(someWords[randomIndex])) {
        randomObjects.push(someWords[randomIndex]);
      } else {
        i--;
      }
    }
    container.innerHTML = randomObjects.join(" | ");
  }
  let sectionEmparejar = document.getElementById("section-match");
  sectionEmparejar.style.display = 'flex';
}

// funcion para emparejar 
function match() {
  let sectionPlay = document.getElementById('section-play')
  sectionPlay.style.display = 'none'
  let container = document.getElementById("images-container2");
  let obj
  // Obtener objetos al azar
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * randomObjects.length);
    if (!arrayCopy.includes(randomObjects[randomIndex])) {
      if (selectedValue == "images") {
        obj = document.createElement("img"); // Creamos una elemento de tipo imagen
        obj.src = "./states/image" + randomObjects[randomIndex] + ".jpeg"; // definimos la ruta de la imagen
      } else {
        obj = document.createElement("p"); // Creamos una elemento de tipo p [parrafo]
        obj.innerHTML = randomObjects[randomIndex] // Pongo la palabra dentro del parrafo
      }
      container.appendChild(obj); //Agregamos el al contenedor
      arrayCopy.push(randomObjects[randomIndex]) //Las posiciones del nuevo array
      // Agregar input para indicar el orden correcto
      let input = document.createElement("input");
      input.type = "number";
      input.name = "orden";
      container.appendChild(input);
    } else {
      i--;
    }
    // container.style.display = 'none'
  }
  //Agregar el temporizador
  function timer() {
    let timeLeft = 20;
    timerId = setInterval(function () {
      timeLeft--;
      document.getElementById("timer-display").innerHTML = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        alert("Se te acabó el tiempo, perdiste.");
      }
    }, 1000);
  }
  timer();
}
document.getElementById("button-match").addEventListener("click", match);

// Funcion validar 
function validate() {
  clearInterval(timerId);
  let inputs = document.getElementsByName("orden");
  console.log(inputs.length);
  let correctOrder = true;

  for (let i = 0; i < inputs.length; i++) {
    if (arrayCopy[i] != randomObjects[parseInt(inputs[i].value) - 1]) {
      correctOrder = false;
      break;
    }
  }

  if (correctOrder) {
    alert("Felicidades, acertaste el orden de las imágenes!");
  } else {
    alert("Lo siento, no acertaste el orden de las imágenes.");
  }
};
document.getElementById("button-validate").addEventListener("click", validate);


function reload() {
  location.reload();
}
document.getElementById("button-reset").addEventListener("click", reload);


