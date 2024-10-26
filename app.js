function playGame(userChoice) {
    const choices = ["Piedra", "Papel", "Tijera"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
  
    let result;
    if (userChoice === computerChoice) {
      result = "¡Es un empate!";
    } else if (
      (userChoice === "Piedra" && computerChoice === "Tijera") ||
      (userChoice === "Tijera" && computerChoice === "Papel") ||
      (userChoice === "Papel" && computerChoice === "Piedra")
    ) {
      result = "¡Ganaste!";
    } else {
      result = "Perdiste. La computadora ganó.";
    }
  
    document.getElementById("result").textContent =
      `Tú elegiste: ${userChoice}. Computadora eligió: ${computerChoice}. ${result}`;
}
  
// Registrar el Service Worker
if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
    });
});
}


let deferredPrompt; // Variable para guardar el evento de instalación

const installButton = document.getElementById('install-button');

// Escucha el evento 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
// Previene que el navegador muestre el diálogo de instalación automáticamente
e.preventDefault();
deferredPrompt = e; // Guarda el evento para dispararlo más tarde

// Muestra el botón personalizado de instalación
installButton.style.display = 'block';
});

// Maneja el clic en el botón de instalación
installButton.addEventListener('click', async () => {
if (deferredPrompt) {
    // Muestra el diálogo de instalación
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
    console.log('PWA instalada');
    } else {
    console.log('El usuario canceló la instalación');
    }

    // Limpia el evento para evitar múltiples ejecuciones
    deferredPrompt = null;
}
});