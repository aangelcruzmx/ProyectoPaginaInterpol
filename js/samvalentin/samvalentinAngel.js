
// obtengo los elemetos necesarios para su posterior utliizacion

document.addEventListener('DOMContentLoaded', () => {
    const showMemesBtn = document.getElementById('show-memes-btn');
    const memesGallery = document.getElementById('memes-gallery');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizQuestions = document.getElementById('quiz-questions');
    const showSamMemeBtn = document.getElementById('show-sam-meme-btn');

    // desahabilita el boton
    showSamMemeBtn.disabled = true;
  
    // funcio mostrar los memes de san valentin generales
    showMemesBtn.addEventListener('click', () => {
      memesGallery.style.display = 'block'; // Mostrar la galería de memes
    });
  
    // preguntas 
    const questions = [
      "¿Cuál es el verdadero nombre de Sauron?",
      "¿Cómo se llama la espada que Frodo lleva en su travesía para destruir el Anillo?",
    ];
  
    // respuestas correctas
    const answers = [
      "Anatar",
      "Dardo",
    ];
  
    //  para mostrar preguntas del quiz
    function showQuizQuestions() {
      quizQuestions.innerHTML = '';
      let correctAnswersCount = 0;
      questions.forEach((question, index) => {
        const userAnswer = prompt(question);
        if (userAnswer && userAnswer.toLowerCase() === answers[index].toLowerCase()) {
          correctAnswersCount++;
        } else {
          alert("Respuesta incorrecta. Por favor, inténtalo de nuevo.");
          return; // salir de la funcion si hay una respuesta incorrecta
        }
      });
      //si son correctas se habilitan
      if (correctAnswersCount === questions.length) {
        showSamMemeBtn.disabled = false;
      }
    }
  
    // inicia quiz
    startQuizBtn.addEventListener('click', () => {
      showQuizQuestions();
    });
  
     //mostar el meme solo cuando el boton esta habilitado
     showSamMemeBtn.addEventListener('mouseover', () => {
      if (!showSamMemeBtn.disabled) {
        const quiz = document.getElementById('quiz');
        const quizRect = quiz.getBoundingClientRect();
        const maxX = quizRect.width - showSamMemeBtn.offsetWidth;
        const maxY = quizRect.height - showSamMemeBtn.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
    
        const adjustedX = Math.max(randomX, 0);
        const adjustedY = Math.max(randomY, 0);
    
        showSamMemeBtn.style.position = 'absolute';
        showSamMemeBtn.style.left = adjustedX + 'px';
        showSamMemeBtn.style.top = adjustedY + 'px';
      }
    });

    // mostrarr el meme estelar cuando se clickea en el boton showSamMeme

showSamMemeBtn.addEventListener('click', () => {
  const memeContainer = document.getElementById('meme-container');
  memeContainer.style.display = 'flex';
  memeContainer.style.alignItems = 'center';
  memeContainer.style.justifyContent = 'center';
});

//  cerrar el contenedor del meme y resetear la pagina
function closeMemeContainer() {
  const memeContainer = document.getElementById('meme-container');
  memeContainer.style.display = 'none';
  location.reload(); // Recargar la página
}

// cierra el meme al dar click
document.getElementById('close-meme-btn').addEventListener('click', closeMemeContainer);

//para resetear la pagina al cerrar
function resetAll (){
  location.reload();
}


  //para que el boton no se salga de la pagina
  window.addEventListener('scroll', () => {
    const footerOffset = document.querySelector('footer').getBoundingClientRect().top;
    if (footerOffset < window.innerHeight && showSamMemeBtn.disabled) {
      
      showSamMemeBtn.style.bottom = '20px';
    } 
  });


  //cronometro(no esta probado)
  function showFuckingMeme() {
    const memeContainer = document.getElementById('meme-container');
    memeContainer.style.display = 'block';
  }

  // se establece el tiempo
  const tiempoDeEspera = 70000;

  
  setTimeout(showFuckingMeme, tiempoDeEspera);

















});



