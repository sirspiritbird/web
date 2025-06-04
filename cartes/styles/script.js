let isSpinning = false;

function updateName() {
    const name = document.getElementById('nameInput').value || 'Votre Nom';
    document.getElementById('cardName').textContent = name;
}

function spinCard() {
    const card = document.getElementById('playingCard');
    const spinButton = document.querySelector('button[onclick="spinCard()"]');
    isSpinning = !isSpinning;
    
    if (isSpinning) {
        card.classList.add('spin-animation');
        spinButton.textContent = 'Arrêter rotation';
    } else {
        card.classList.remove('spin-animation');
        card.style.animation = 'float 3s ease-in-out infinite';
        spinButton.textContent = 'Démarrer rotation';
    }
}