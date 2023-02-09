
// mostrar las imagenes random al presionar el boton jugar. 
let container = document.getElementById("objects-container");
let randomObjects
document.getElementById("button-play").addEventListener("click", function () {
  randomObjects = [];
  container.innerHTML = ""
  let items = document.getElementsByName("items");
  let selectedValue;
  for (let i = 0; i < items.length; i++) {
    if (items[i].checked) {
      selectedValue = items[i].id;
      break;
    }
  }
  if (selectedValue === "images") {
    load("images")
  } else if (selectedValue === "words") {
    load("words")
  }
});

function load(type) {
  
  if (type == "images") {
    //generar imagenes random
    const n = 14;
    
    for (let i = 0; i < 5; i++) {
      let randomNumber = Math.floor(Math.random() * n) + 1;
      if (!randomObjects.includes(randomNumber)) {
        let image = document.createElement("img");
        image.src = "./states/image" + randomNumber + ".jpeg";
        container.appendChild(image);
        randomObjects.push(randomNumber);
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
}


// mostrar nuevamente las imagenes en desorden al presionar el boton emparejar. 

//let timerId;

function match() {
  console.log("hola");
  let container = document.getElementById("images-container2");
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * randomObjects.length);
    let image = randomObjects[randomIndex];
    randomObjects.splice(randomIndex, 1);
    container.appendChild(image);

    let input = document.createElement("input");
    input.type = "number";
    container.appendChild(input);
  }
  // agregar el temporizador
  let timeLeft = 15;
  timerId = setInterval(function () {
    timeLeft--;
    document.getElementById("timer-display").innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      alert("Se te acabó el tiempo, perdiste.");
    }
  }, 1000);
}
document.getElementById("button-match").addEventListener("click", match);

document.getElementById("button-validate").addEventListener("click", function () {
  clearInterval(timerId);

  let container = document.getElementById("images-container2");
  let images = container.getElementsByTagName("img");
  let inputs = container.getElementsByTagName("input");

  let correctOrder = true;
  for (let i = 0; i < images.length; i++) {
    if (parseInt(inputs[i].value) !== i) {
      correctOrder = false;
      break;
    }
  }

  console.log("Orden de los inputs: ");
  for (let i = 0; i < inputs.length; i++) {
    console.log(inputs[i].value);
  }

  console.log("Orden correcto: " + correctOrder);

  if (correctOrder) {
    alert("Felicidades, acertaste el orden de las imágenes!");
  } else {
    alert("Lo siento, no acertaste el orden de las imágenes.");
  }
});

document.getElementById("button-play").addEventListener("click", function () {
  let container = document.getElementById("images-container");
  let images = container.getElementsByTagName("img");

  for (let i = images.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [images[i].src, images[j].src] = [images[j].src, images[i].src];
  }

  let order = [];
  for (let i = 0; i < images.length; i++) {
    order.push(images[i].src);
  }
  console.log("El orden de las imágenes después de hacer clic en el botón Jugar es:", order);
});

document.getElementById("button-reset").addEventListener("click", function () {
  location.reload();
});
