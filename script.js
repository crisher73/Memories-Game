function seleccionaItemJugador() {
  let inputImages = document.getElementById('images');
  let inputWords = document.getElementById('words');

  inputImages.addEventListener("click", function () {
    if (inputImages.checked) {
      alert("Seleccionaste Imágenes");
    }
  });

  inputWords.addEventListener("click", function () {
    if (inputWords.checked) {
      alert("Seleccionaste Palabras");
    }
  });
}
seleccionaItemJugador();

// mostrar las imagenes random al presionar el boton jugar. 
let imagesArray = [];

document.getElementById("button-play").addEventListener("click", function () {
  let container = document.getElementById("images-container");
  for (let i = 0; i < 5; i++) {
    let randomNumber = Math.floor(Math.random() * 1000) + 1;
    let image = document.createElement("img");
    image.src = "https://picsum.photos/200?image=" + randomNumber;
    container.appendChild(image);
    imagesArray.push(image);
  }
});

// mostrar nuevamente las imagenes en desorden al presionar el boton emparejar. 

let timerId;

document.getElementById("button-emparejar").addEventListener("click", function () {
  let container = document.getElementById("images-container2");
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * imagesArray.length);
    let image = imagesArray[randomIndex];
    imagesArray.splice(randomIndex, 1);
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
});


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
