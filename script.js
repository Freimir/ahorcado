// Palabras disponibles
const words = ['casa', 'mano', 'pelo', 'luna'];
// Seleccionar palabra aleatoria
let SecretWord = words[Math.floor(Math.random() * words.length)];

// Variables del juego
let guiones = SecretWord.replace(/./g, "_ ");
let errorcount = 0;

// Elementos del DOM
const guionesElement = document.querySelector('.guiones');
const intentosElement = document.querySelector('#intentos');
const porcentajeElement = document.querySelector('#porcentaje');
const inputElement = document.querySelector('#letraInput');
const ahorcadoElement = document.querySelector('.ahorcado');
const containerElement = document.querySelector('.container');
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const toggleButton = document.getElementById('toggleButton');
const startButton = document.getElementById('startButton');

// Función para inicializar el juego
const initGame = () => {
    SecretWord = words[Math.floor(Math.random() * words.length)];
    guiones = SecretWord.replace(/./g, "_ ");
    errorcount = 0;
    
    guionesElement.textContent = guiones;
    intentosElement.textContent = 4 - errorcount;
    porcentajeElement.textContent = '0%';
    ahorcadoElement.style.backgroundPosition = '0 0';
    
    welcomeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    toggleButton.textContent = 'Salir';
};

// Función para calcular porcentaje de progreso
const calcularPorcentaje = () => {
    const letrasAdivinadas = guiones.replace(/_/g, '').replace(/ /g, '').length;
    return Math.round((letrasAdivinadas / SecretWord.length) * 100);
};

// Función para reemplazar caracteres
const replaceAt = (str, char, index) => {
    return str.substring(0, index) + char + str.substring(index + 1);
};

// Función principal del juego
const evaluarLetra = () => {
    const letter = inputElement.value.toLowerCase();
    inputElement.value = ''; // Limpiar input
    
    // Validar entrada
    if (!letter.match(/^[a-zñ]$/)) {
        alert("Por favor, ingresa solo una letra válida (a-z, ñ).");
        return;
    }

    let error = true;

    // Verificar letra en palabra secreta
    for (let i = 0; i < SecretWord.length; i++) {
        if (SecretWord[i] === letter) {
            guiones = replaceAt(guiones, letter, i * 2);
            error = false;
        }
    }

    // Actualizar interfaz
    guionesElement.textContent = guiones;
    porcentajeElement.textContent = calcularPorcentaje() + '%';

    if (error) {
        errorcount++;
        intentosElement.textContent = 4 - errorcount;
        ahorcadoElement.style.backgroundPosition = `-${errorcount * 300}px 0`;
        
        // Verificar si perdió
        if (errorcount === 4) {
            containerElement.innerHTML = `
                <div class="game-over">
                    <h1 style="color: red;">Has Perdido</h1>
                    <p>La palabra era: <strong>${SecretWord}</strong></p>
                    <p>Progreso final: <strong>${calcularPorcentaje()}%</strong></p>
                    <button onclick="initGame()">Jugar de nuevo</button>
                </div>
            `;
        }
    }

    // Verificar si ganó
    if (!guiones.includes('_')) {
        containerElement.innerHTML = `
            <div class="win">
                <h1 style="color: green;">¡Has Ganado!</h1>
                <p>Progreso final: <strong>100%</strong></p>
                <button onclick="initGame()">Jugar de nuevo</button>
            </div>
        `;
    }
};

// Eventos
document.querySelector('.conf').addEventListener('click', evaluarLetra);
inputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        evaluarLetra();
    }
});

startButton.addEventListener('click', initGame);

toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (gameScreen.style.display === 'none') {
        initGame();
    } else {
        welcomeScreen.style.display = 'block';
        gameScreen.style.display = 'none';
        toggleButton.textContent = 'Iniciar';
    }
});