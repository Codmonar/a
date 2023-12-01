// Esta variable guardará el evento para usarlo más tarde.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Evita que aparezca el mini-infobar o el diálogo de instalación predeterminado del navegador en móviles
  e.preventDefault();
  // Guarda el evento porque lo necesitarás para activarlo más tarde.
  deferredPrompt = e;
  // Muestra tu interfaz de usuario personalizada para instalar tu PWA
  // Tu propia interfaz de usuario no tiene que ser un solo elemento, puedes
  // tener botones en diferentes lugares, o esperar a pedir la instalación
  // como parte de un recorrido crítico.
  mostrarPromocionDeInstalacionEnApp();
});

// Luego, si el usuario hace clic en tu botón personalizado de instalación, usa el deferredPrompt que has guardado previamente y llama a su método prompt(), porque el usuario todavía necesita pasar por el proceso del navegador para instalar tu app. Lo que hiciste fue retrasar el evento hasta que le diste al usuario el contexto adecuado para animarlo a instalar la PWA. Capturar el evento te da la oportunidad de añadir pistas e incentivos para que tus usuarios instalen tu app, y de elegir el momento de pedir la instalación cuando sepas que los usuarios están más comprometidos.

// Este código se ejecuta cuando el usuario hace clic en el botón de instalación
botonDeInstalacion.addEventListener('click', (e) => {
  // Oculta la interfaz de usuario que muestra el botón de instalación
  ocultarPromocionDeInstalacionEnApp();
  // Muestra el diálogo de instalación del navegador
  deferredPrompt.prompt();
  // Espera a que el usuario responda al diálogo de instalación
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('El usuario aceptó la solicitud de instalación');
    } else {
      console.log('El usuario rechazó la solicitud de instalación');
    }
    deferredPrompt = null;
  });
});
