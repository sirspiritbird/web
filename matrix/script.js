// Configuration
const config = {
    word: "MATRIX",
    charChangeSpeed: 50,
    fontSize: 14,
    columns: 0,
    drops: [],
    matrixChars: "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
};

// Elements DOM
const wordInput = document.getElementById('word-input');
const updateBtn = document.getElementById('update-btn');
const wordContainer = document.getElementById('word-container');
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Initialisation
function init() {
    resizeCanvas();
    initMatrixRain();
    updateWord(config.word);
    
    // Événements
    updateBtn.addEventListener('click', () => {
        config.word = wordInput.value.toUpperCase() || "MATRIX";
        updateWord(config.word);
    });
    
    window.addEventListener('resize', resizeCanvas);
}

// Animation du mot
function updateWord(newWord) {
    wordContainer.innerHTML = '';
    
    for (let i = 0; i < newWord.length; i++) {
        const charElement = document.createElement('span');
        charElement.className = 'char';
        charElement.textContent = getRandomMatrixChar();
        wordContainer.appendChild(charElement);
        
        animateChar(charElement, newWord[i], i * 150);
    }
}

function animateChar(element, targetChar, delay) {
    setTimeout(() => {
        let iterations = 0;
        const totalIterations = 10 + Math.floor(Math.random() * 15);
        const interval = setInterval(() => {
            element.textContent = getRandomMatrixChar();
            iterations++;
            
            if (iterations >= totalIterations) {
                clearInterval(interval);
                element.textContent = targetChar;
                element.style.opacity = '1';
                
                // Effet de flash
                element.style.textShadow = '0 0 15px #0f0, 0 0 30px #0f0';
                setTimeout(() => {
                    element.style.textShadow = '0 0 10px #0f0';
                }, 200);
            }
        }, config.charChangeSpeed);
    }, delay);
}

// Pluie Matrix en arrière-plan
function initMatrixRain() {
    config.columns = Math.floor(canvas.width / config.fontSize);
    config.drops = Array(config.columns).fill(0);
}

function drawMatrixRain() {
    // Fond semi-transparent pour effet de traînée
    ctx.fillStyle = 'rgba(0, 10, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Couleur des caractères (vert Matrix)
    ctx.fillStyle = '#0f0';
    ctx.font = config.fontSize + 'px monospace';
    
    for (let i = 0; i < config.drops.length; i++) {
        const char = getRandomMatrixChar();
        const x = i * config.fontSize;
        const y = config.drops[i] * config.fontSize;
        
        // Dessiner le caractère
        ctx.fillText(char, x, y);
        
        // Réinitialiser la goutte quand elle sort de l'écran
        if (y > canvas.height && Math.random() > 0.975) {
            config.drops[i] = 0;
        }
        
        config.drops[i]++;
    }
}

// Fonctions utilitaires
function getRandomMatrixChar() {
    return config.matrixChars[Math.floor(Math.random() * config.matrixChars.length)];
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initMatrixRain();
}

// Boucle d'animation
function animate() {
    drawMatrixRain();
    requestAnimationFrame(animate);
}

// Démarrer
init();
animate();