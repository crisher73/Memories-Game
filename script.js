function seleccionaItemJugador() {
    let inputImages = document.getElementById('images');
    let inputWords = document.getElementById('words');

    inputImages.addEventListener("click", function() {
      if (inputImages.checked) {
        alert("Seleccionaste Imágenes");
      }
    });

    inputWords.addEventListener("click", function() {
      if (inputWords.checked) {
        alert("Seleccionaste Palabras");
      }
    });
  }
  seleccionaItemJugador();
