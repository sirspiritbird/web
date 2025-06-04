const word = "MATRIX";
const container = document.getElementById('matrix-reveal');
const chars = [];

// Créer les caractères initiaux
for (let i = 0; i < word.length; i++) {
    const charContainer = document.createElement('span');
    charContainer.className = 'char';
    
    const char = document.createElement('span');
    char.textContent = getRandomChar();
    chars.push({ element: char, target: word[i], container: charContainer });
    
    charContainer.appendChild(char);
    container.appendChild(charContainer);
    
    // Démarrer l'animation pour chaque caractère avec un délai aléatoire
    setTimeout(() => animateChar(chars[i]), Math.random() * 2000);
}

function animateChar(charObj) {
    let iterations = 0;
    const totalIterations = 10 + Math.floor(Math.random() * 20);
    const delay = 50 + Math.floor(Math.random() * 100);
    
    // Créer un effet de "stream" tombant
    createStream(charObj.container);
    
    const interval = setInterval(() => {
        charObj.element.textContent = getRandomChar();
        iterations++;
        
        if (iterations >= totalIterations) {
            clearInterval(interval);
            charObj.element.textContent = charObj.target;
            charObj.element.style.opacity = 1;
            
            // Effet de flash final
            setTimeout(() => {
                charObj.element.style.textShadow = '0 0 10px #00ff00';
                setTimeout(() => {
                    charObj.element.style.textShadow = 'none';
                }, 200);
            }, 100);
        }
    }, delay);
}

function getRandomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%$#@!&*";
    return chars[Math.floor(Math.random() * chars.length)];
}

function createStream(container) {
    const stream = document.createElement('div');
    stream.className = 'stream';
    
    // Créer une séquence de caractères aléatoires
    let streamContent = '';
    const length = 5 + Math.floor(Math.random() * 10);
    for (let i = 0; i < length; i++) {
        streamContent += getRandomChar();
    }
    
    stream.textContent = streamContent;
    container.appendChild(stream);
    
    // Animation du stream qui tombe
    let position = -100;
    const speed = 2 + Math.random() * 3;
    
    const moveStream = () => {
        position += speed;
        stream.style.top = position + 'px';
        
        if (position < 100) {
            requestAnimationFrame(moveStream);
        } else {
            stream.remove();
        }
    };
    
    requestAnimationFrame(moveStream);
}