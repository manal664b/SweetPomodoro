/**
 * SweetPomodoro — lógica de la aplicación.
 *
 * Este archivo controla el temporizador Pomodoro, los modos de estudio y descanso,
 * el sonido al terminar, las sesiones completadas, el modal de aviso y los temas.
 * Se carga con `defer` desde index.html para que el HTML esté disponible antes
 * de que se ejecuten estas instrucciones.
 */

const timerDisplay = document.getElementById('timer-display');

const timerStatus = document.getElementById('timer-status');

const btnStart = document.getElementById('btn-start');

const textStart = document.getElementById('text-start');

const iconPlay = document.getElementById('icon-play');

const btnReset = document.getElementById('btn-reset');

const progressCircle = document.getElementById('progress-circle');

const sessionsCountEl = document.getElementById('sessions-count');

const flowerGarden = document.getElementById('flower-garden');

const themeToggle = document.getElementById('theme-toggle');

const tabs = {

    work: document.getElementById('tab-work'),

    shortBreak: document.getElementById('tab-shortBreak'),

    longBreak: document.getElementById('tab-longBreak')

};

const modal = document.getElementById('modal-notification');

const modalTitle = document.getElementById('modal-title');

const modalMessage = document.getElementById('modal-message');

const modalClose = document.getElementById('modal-close');

// Duraciones de cada modo expresadas en segundos.

const times = {

    work: 25 * 60,

    shortBreak: 5 * 60,

    longBreak: 15 * 60

};

let currentMode = 'work';

let timeLeft = times[currentMode];

let totalDuration = times[currentMode];

let timerId = null;

let isRunning = false;

let completedSessions = 0;

const circumference = 2 * Math.PI * 42;

progressCircle.style.strokeDasharray = circumference;

// Reproduce un tono corto usando la Web Audio API; si no está disponible, la app sigue funcionando.
function playBeep() {

    try {

        const AudioContext = window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        const ctx = new AudioContext();

        const osc = ctx.createOscillator();

        const gain = ctx.createGain();

        osc.type = 'sine';

        osc.frequency.setValueAtTime(659.25, ctx.currentTime);

        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);

        osc.connect(gain);

        gain.connect(ctx.destination);

        osc.start();

        osc.stop(ctx.currentTime + 0.7);

    } catch (e) {

        console.warn('No se pudo reproducir el sonido en este navegador.');

    }

}

// Actualiza el reloj, el título de la pestaña y el círculo de progreso.
function updateDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    timerDisplay.textContent = timeString;

    document.title = `${timeString} - SweetPomodoro 🌸`;

    const offset = circumference - (timeLeft / totalDuration) * circumference;

    progressCircle.style.strokeDashoffset = offset;

}

// Cambia el modo activo y reinicia el tiempo a la duración configurada para ese modo.
function setMode(mode) {

    if (isRunning) {

        pauseTimer();

    }

    currentMode = mode;

    timeLeft = times[mode];

    totalDuration = times[mode];

    Object.keys(tabs).forEach(key => {

        if (key === mode) {

            tabs[key].className = "flex-1 py-2.5 text-xs font-bold rounded-2xl transition-all duration-300 bg-gradient-to-r from-blush-400 to-blush-500 text-white shadow-md shadow-blush-400/30";

        } else {

            tabs[key].className = "flex-1 py-2.5 text-xs font-bold rounded-2xl transition-all duration-300 text-slate-500 hover:text-blush-600";

        }

    });

    if (mode === 'work') {

        timerStatus.textContent = "Momento de Focus";

    } else if (mode === 'shortBreak') {

        timerStatus.textContent = "Descanso Dulce";

    } else if (mode === 'longBreak') {

        timerStatus.textContent = "Descanso Largo";

    }

    updateDisplay();

}

// Inicia la cuenta atrás o pausa el temporizador si ya está en marcha.
function startTimer() {

    if (isRunning) {

        pauseTimer();

        return;

    }

    isRunning = true;

    textStart.textContent = "Pausar";

    iconPlay.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';

    timerId = setInterval(() => {

        if (timeLeft > 0) {

            timeLeft--;

            updateDisplay();

        } else {

            clearInterval(timerId);

            isRunning = false;

            playBeep();

            handleTimerCompletion();

        }

    }, 1000);

}

// Detiene el intervalo sin perder el tiempo restante.
function pauseTimer() {

    isRunning = false;

    clearInterval(timerId);

    textStart.textContent = "Iniciar";

    iconPlay.innerHTML = '<path d="M8 5v14l11-7z"/>';

}

// Reinicia el modo actual y actualiza la pantalla.
function resetTimer() {

    pauseTimer();

    timeLeft = times[currentMode];

    totalDuration = times[currentMode];

    updateDisplay();

}

// Gestiona el final de un ciclo: actualiza sesiones, añade flores y cambia de modo.
function handleTimerCompletion() {

    textStart.textContent = "Iniciar";

    iconPlay.innerHTML = '<path d="M8 5v14l11-7z"/>';

    if (currentMode === 'work') {

        completedSessions++;

        sessionsCountEl.textContent = completedSessions;

        if (completedSessions === 1) {

            flowerGarden.innerHTML = '';

        }

        const icons = ['🌸', '🌷', '💖', '✨', '🎀', '🌺'];

        const randomIcon = icons[(completedSessions - 1) % icons.length];

        const span = document.createElement('span');

        span.textContent = randomIcon;

        span.className = "transform hover:scale-125 transition-transform cursor-pointer";

        span.title = `Sesión #${completedSessions} completada`;

        flowerGarden.appendChild(span);

        showModal("¡Felicidades, hermosa meta!", "Has completado tu ciclo de estudio con éxito. ¡Te ganaste una nueva flor para tu jardín!");

        setMode('shortBreak');

    } else {

        showModal("¡Descanso terminado!", "Las energías están recargadas. ¿Lista para otra sesión de estudio?");

        setMode('work');

    }

}

// Inserta el título y el mensaje recibidos y hace visible el modal.
function showModal(title, message) {

    modalTitle.textContent = title;

    modalMessage.textContent = message;

    modal.classList.remove('hidden');

}

modalClose.addEventListener('click', () => {

    modal.classList.add('hidden');

});

btnStart.addEventListener('click', startTimer);

btnReset.addEventListener('click', resetTimer);

Object.keys(tabs).forEach(mode => {

    tabs[mode].addEventListener('click', () => setMode(mode));

});

// El botón de tema avanza por las paletas de colores definidas más abajo.
let paletteIndex = 0;

const palettes = [

    { bg: 'from-blush-50 via-pink-50 to-pastel-cream', text: 'text-slate-700' },

    { bg: 'from-pastel-lavender via-pink-50 to-blush-50', text: 'text-slate-800' },

    { bg: 'from-pastel-peach via-pink-50 to-blush-50', text: 'text-slate-800' }

];

themeToggle.addEventListener('click', () => {

    paletteIndex = (paletteIndex + 1) % palettes.length;

    const current = palettes[paletteIndex];

    document.body.className = `h-full bg-gradient-to-br ${current.bg} ${current.text} flex flex-col justify-between selection:bg-blush-400 selection:text-white`;

});

// Inicializa la interfaz con el tiempo del modo seleccionado.

updateDisplay();
