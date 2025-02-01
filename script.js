// Añadir funcionalidad de pantalla completa
function setupFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  
  fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
              console.log(`Error al intentar modo pantalla completa: ${err.message}`);
          });
          fullscreenBtn.textContent = '🔽 Salir P.Completa';
      } else {
          document.exitFullscreen();
          fullscreenBtn.textContent = '📺 Pantalla Completa';
      }
  });

  // Actualizar el botón cuando cambie el estado de pantalla completa
  document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
          fullscreenBtn.textContent = '📺 Pantalla Completa';
      } else {
          fullscreenBtn.textContent = '🔽 Salir P.Completa';
      }
  });
}

// Modificar la función startGame para incluir la configuración de pantalla completa
function startGame() {
  setupMusicControls();
  setupFullscreenButton();
  showLoadingScreen();
}

// Modificar showPetSelection para mantener el logo visible
function showPetSelection() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';

  const petsWrapper = document.createElement('div');
  petsWrapper.id = 'pets-selection-wrapper';

  const title = document.createElement('h1');
  title.textContent = 'Elige tu Mascota';
  petsWrapper.appendChild(title);

  const petsContainer = document.createElement('div');
  petsContainer.className = 'pets-container';

  const pets = ['mascota1', 'mascota2', 'mascota3'];

  pets.forEach(pet => {
      const petImg = document.createElement('img');
      petImg.src = `images/mascotas/${pet}.png`;
      petImg.alt = pet;
      petImg.classList.add('pet-option');
      
      // Añadir animación al seleccionar
      petImg.addEventListener('click', () => {
          petImg.style.transform = 'scale(1.5) rotate(360deg)';
          petImg.style.transition = 'all 0.5s ease';
          
          setTimeout(() => {
              selectedPet = pet;
              loadHome();
          }, 500);
      });
      
      petsContainer.appendChild(petImg);
  });

  petsWrapper.appendChild(petsContainer);
  container.appendChild(petsWrapper);
}
// Variables globales
let selectedPet = null;
let gameState = {
    hunger: 100,
    happiness: 100,
    hygiene: 100,
    energy: 100,
    location: 'home',
    intervalId: null
};

// Iniciar el juego al cargar la página
window.onload = startGame;

function startGame() {
    setupMusicControls();
    showLoadingScreen();
}

// Función para hacer que las estadísticas bajen con el tiempo
function startStatsDecrement() {
    if (!gameState.intervalId) {
        gameState.intervalId = setInterval(decreaseStats, 5000);
    }
}

/* Configurar controles de música */
function setupMusicControls() {
  const music = document.getElementById('background-music');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const muteBtn = document.getElementById('mute-btn');
  const volumeControl = document.getElementById('volume-control');

  playPauseBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      music.pause();
      playPauseBtn.textContent = 'Play';
    }
  });

  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    muteBtn.textContent = music.muted ? 'Unmute' : 'Mute';
  });

  volumeControl.addEventListener('input', () => {
    music.volume = volumeControl.value;
  });
}

/* Pantalla de carga inicial */
function showLoadingScreen() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';

  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'loading-screen';

  const logo = document.createElement('img');
  logo.src = 'images/logo.png';
  logo.id = 'logo';
  loadingDiv.appendChild(logo);

  const playButton = document.createElement('button');
  playButton.textContent = 'Jugar';
  playButton.addEventListener('click', () => {
    // Añadimos la clase 'fade-out' para la transición
    loadingDiv.classList.add('fade-out');
    setTimeout(showPetSelection, 1000);
  });
  loadingDiv.appendChild(playButton);

  container.appendChild(loadingDiv);
}

/* 1. Selección de Mascota */
function showPetSelection() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';

    const petsWrapper = document.createElement('div');
    petsWrapper.id = 'pets-selection-wrapper';

    const title = document.createElement('h1');
    title.textContent = 'Elige tu Mascota';
    petsWrapper.appendChild(title);

    const petsContainer = document.createElement('div');
    petsContainer.className = 'pets-container';

    const pets = ['mascota1', 'mascota2', 'mascota3'];

    pets.forEach(pet => {
        const petImg = document.createElement('img');
        petImg.src = `images/mascotas/${pet}.png`;
        petImg.alt = pet;
        petImg.classList.add('pet-option');
        petImg.addEventListener('click', () => {
            selectedPet = pet;
            loadHome();
        });
        petsContainer.appendChild(petImg);
    });

    petsWrapper.appendChild(petsContainer);
    container.appendChild(petsWrapper);
}

/* 2. Pantalla Principal */
function loadHome() {
    gameState.location = 'home';
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    container.style.backgroundImage = 'url("images/home-background.png")';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';

    const mainMenu = document.createElement('div');
    mainMenu.id = 'main-menu';

    const petImg = document.createElement('img');
    petImg.src = `images/mascotas/${selectedPet}.png`;
    petImg.id = 'pet-img';
    mainMenu.appendChild(petImg);

    const navDiv = document.createElement('div');
    navDiv.id = 'navigation';

    const kitchenBtn = document.createElement('button');
    kitchenBtn.textContent = 'Cocina';
    kitchenBtn.addEventListener('click', loadKitchen);
    navDiv.appendChild(kitchenBtn);

    const bathroomBtn = document.createElement('button');
    bathroomBtn.textContent = 'Baño';
    bathroomBtn.addEventListener('click', loadBathroom);
    navDiv.appendChild(bathroomBtn);

    const bedroomBtn = document.createElement('button');
    bedroomBtn.textContent = 'Dormitorio';
    bedroomBtn.addEventListener('click', loadBedroom);
    navDiv.appendChild(bedroomBtn);

    const parkBtn = document.createElement('button');
    parkBtn.textContent = 'Parque';
    parkBtn.addEventListener('click', loadPark);
    navDiv.appendChild(parkBtn);

    mainMenu.appendChild(navDiv);
    container.appendChild(mainMenu);

    showStats();
    updateStats();

    // Iniciar la disminución de estadísticas
    if (!gameState.intervalId) {
        gameState.intervalId = setInterval(() => {
            decreaseStats();
            updateStats(); // Actualizar HUD inmediatamente
        }, 5000);
    }
}

/* 3. Mostrar Estados */
function showStats() {
    const container = document.getElementById('game-container');

    const existingStatsContainer = document.getElementById('stats-container');
    if (existingStatsContainer) {
        existingStatsContainer.remove();
    }

    const statsContainer = document.createElement('div');
    statsContainer.id = 'stats-container';

    const statsDiv = document.createElement('div');
    statsDiv.id = 'stats';

    const statsConfig = [
        { name: 'Hambre', emoji: '🍽️', key: 'hunger', colorClass: 'hunger' },
        { name: 'Felicidad', emoji: '😊', key: 'happiness', colorClass: 'happiness' },
        { name: 'Higiene', emoji: '🚿', key: 'hygiene', colorClass: 'hygiene' },
        { name: 'Energía', emoji: '⚡', key: 'energy', colorClass: 'energy' }
    ];

    statsConfig.forEach(stat => {
        const statKey = translateStat(stat.key);
        const statP = document.createElement('p');
        statP.id = `${statKey}-stat`;
        statP.className = stat.colorClass;
        
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'stat-emoji';
        emojiSpan.textContent = stat.emoji;
        
        const valueSpan = document.createElement('span');
        valueSpan.textContent = ` ${stat.name}: ${gameState[statKey]}`;
        
        statP.appendChild(emojiSpan);
        statP.appendChild(valueSpan);
        
        if (gameState[statKey] < 50) {
            statP.classList.add('stat-low');
        }
        
        statsDiv.appendChild(statP);
    });

    statsContainer.appendChild(statsDiv);
    container.appendChild(statsContainer);
}

/* 4. Actualizar Estados */
function updateStats() {
    ['hambre', 'felicidad', 'higiene', 'energía'].forEach(stat => {
        const statP = document.getElementById(`${stat}-stat`);
        if (statP) {
            const statKey = translateStat(stat);
            const valueSpan = statP.querySelector('span:last-child');
            valueSpan.textContent = ` ${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${gameState[statKey]}`;
            
            if (gameState[statKey] < 50) {
                statP.classList.add('stat-low');
            } else {
                statP.classList.remove('stat-low');
            }
        }
    });
}

/* 5. Disminuir Estados con el Tiempo */
function decreaseStats() {
    gameState.hunger -= 5;
    gameState.happiness -= 2;
    gameState.hygiene -= 3;
    gameState.energy -= 4;

    Object.keys(gameState).forEach(key => {
        if (typeof gameState[key] === 'number') {
            if (gameState[key] < 0) gameState[key] = 0;
            if (gameState[key] > 100) gameState[key] = 100;
        }
    });
}

/* 6. Navegación entre Áreas */
function loadKitchen() {
  gameState.location = 'kitchen';
  showKitchen();
}

function loadBathroom() {
  gameState.location = 'bathroom';
  showBathroom();
}

function loadBedroom() {
  gameState.location = 'bedroom';
  showBedroom();
}

function loadPark() {
  gameState.location = 'park';
  showPark();
}

/* 7. Cocina */
function showKitchen() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';
  container.style.backgroundImage = 'url("images/fondos/cocina.png")';
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

  const foodsDiv = document.createElement('div');
  foodsDiv.id = 'foods';

  const foods = [
    { name: 'Manzana', value: 10, img: 'apple.png' },
    { name: 'Pizza', value: 25, img: 'pizza.png' },
    { name: 'Helado', value: 15, img: 'icecream.png' }
  ];

  foods.forEach(food => {
    const foodImg = document.createElement('img');
    foodImg.src = `images/comida/${food.img}`;
    foodImg.alt = food.name;
    foodImg.draggable = true;
    foodImg.addEventListener('dragstart', dragStart);
    foodImg.addEventListener('dblclick', () => feedPet(food.value));
    foodsDiv.appendChild(foodImg);
  });

  container.appendChild(foodsDiv);

  const petZone = document.createElement('div');
  petZone.id = 'pet-zone';
  petZone.addEventListener('dragover', dragOver);
  petZone.addEventListener('drop', (e) => drop(e, 'feed'));
  container.appendChild(petZone);

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Volver';
  backBtn.addEventListener('click', loadHome);
  container.appendChild(backBtn);

  showStats();
  updateStats();
}

/* 8. Baño */
function showBathroom() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';
  container.style.backgroundImage = 'url("images/fondos/baño.png")';
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

  const soapImg = document.createElement('img');
  soapImg.src = 'images/soap.png';
  soapImg.alt = 'Jabón';
  soapImg.id = 'soap';
  soapImg.draggable = true;
  soapImg.addEventListener('dragstart', dragStart);
  container.appendChild(soapImg);

  const petZone = document.createElement('div');
  petZone.id = 'pet-zone';
  petZone.addEventListener('dragover', dragOver);
  petZone.addEventListener('drop', (e) => drop(e, 'wash'));
  container.appendChild(petZone);

  const showerBtn = document.createElement('button');
  showerBtn.textContent = 'Encender Ducha';
  showerBtn.addEventListener('click', () => {
    gameState.hygiene += 20;
    if (gameState.hygiene > 100) gameState.hygiene = 100;
    updateStats();
  });
  container.appendChild(showerBtn);

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Volver';
  backBtn.addEventListener('click', loadHome);
  container.appendChild(backBtn);

  showStats();
  updateStats();
}

/* 9. Dormitorio */
function showBedroom() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';
  container.style.backgroundImage = 'url("images/fondos/dormitorio.png")';
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

  const lampImg = document.createElement('img');
  lampImg.src = 'images/lamp_on.png';
  lampImg.alt = 'Lámpara';
  lampImg.id = 'lamp';
  lampImg.addEventListener('click', () => {
    gameState.energy += 30;
    if (gameState.energy > 100) gameState.energy = 100;
    updateStats();
    lampImg.src = 'images/lamp_off.png';
    const petImg = document.getElementById('pet-img');
    if (petImg) {
      petImg.src = `images/mascotas/${selectedPet}_sleep.png`;
    }
  });
  container.appendChild(lampImg);

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Volver';
  backBtn.addEventListener('click', loadHome);
  container.appendChild(backBtn);

  showStats();
  updateStats();
}

/* 10. Parque */
function showPark() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';
  container.style.backgroundImage = 'url("images/fondos/parque.png")';
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

  const ballImg = document.createElement('img');
  ballImg.src = 'images/ball.png';
  ballImg.alt = 'Pelota';
  ballImg.id = 'ball';
  ballImg.addEventListener('click', () => {
    gameState.happiness += 20;
    if (gameState.happiness > 100) gameState.happiness = 100;
    updateStats();
  });
  container.appendChild(ballImg);

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Volver';
  backBtn.addEventListener('click', loadHome);
  container.appendChild(backBtn);

  showStats();
  updateStats();
}

/* 11. Funciones de Arrastrar y Soltar */
let draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event, action) {
  event.preventDefault();
  if (action === 'feed') {
    const foodValue = getFoodValue(draggedItem.alt);
    feedPet(foodValue);
  } else if (action === 'wash') {
    gameState.hygiene += 15;
    if (gameState.hygiene > 100) gameState.hygiene = 100;
    updateStats();
  }
  draggedItem = null;
}

function getFoodValue(foodName) {
  switch (foodName) {
    case 'Manzana':
      return 10;
    case 'Pizza':
      return 25;
    case 'Helado':
      return 15;
    default:
      return 5;
  }
}

function feedPet(value) {
  gameState.hunger += value;
  if (gameState.hunger > 100) gameState.hunger = 100;
  updateStats();
}

/* Función para traducir estados */
function translateStat(stat) {
  switch (stat) {
    case 'hambre':
      return 'hunger';
    case 'felicidad':
      return 'happiness';
    case 'higiene':
      return 'hygiene';
    case 'energía':
      return 'energy';
    default:
      return stat;
  }
}
