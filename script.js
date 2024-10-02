const words = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'pineapple', 'mango', 'pear', 'peach'];
let chosenWord = '';
let remainingAttempts = 6;
let guessedLetters = [];
 
const wordDisplay = document.getElementById('word');
const messageDisplay = document.getElementById('message');
const lettersDisplay = document.getElementById('letters');
const remainingAttemptsDisplay = document.getElementById('remaining-attempts');
const restartBtn = document.getElementById('restart-btn');
 
// Start a new game
function startGame() {
    remainingAttempts = 6;
    guessedLetters = [];
    messageDisplay.textContent = '';
    // Choose a random word from the list
    chosenWord = words[Math.floor(Math.random() * words.length)];
    // Display the word with underscores
    displayWord();
    updateRemainingAttempts();
    displayLetters();
}
 
// Display the current state of the word
function displayWord() {
    let display = chosenWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    wordDisplay.textContent = display;
    if (display.indexOf('_') === -1) {
        messageDisplay.textContent = 'Grattis! Du gissade rätt ord!';
        disableLetterButtons();
    }
}
 
// Display the letters for guessing
function displayLetters() {
    lettersDisplay.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i).toLowerCase();
        let btn = document.createElement('button');
        btn.textContent = letter;
        btn.classList.add('letter-btn');
        btn.disabled = guessedLetters.includes(letter);
        btn.addEventListener('click', () => guessLetter(letter));
        lettersDisplay.appendChild(btn);
    }
}
 
// Handle letter guesses
function guessLetter(letter) {
    guessedLetters.push(letter);
    if (chosenWord.includes(letter)) {
        displayWord();
    } else {
        remainingAttempts--;
        updateRemainingAttempts();
    }
    if (remainingAttempts === 0) {
        messageDisplay.textContent = `Du förlorade! Ordet var "${chosenWord}".`;
        disableLetterButtons();
    }
    displayLetters();
}
 
// Update remaining attempts display
function updateRemainingAttempts() {
    remainingAttemptsDisplay.textContent = `Antal försök kvar: ${remainingAttempts}`;
}
 
// Disable letter buttons when game is over
function disableLetterButtons() {
    document.querySelectorAll('.letter-btn').forEach(button => button.disabled = true);
}
 
// Restart game when clicking the "Starta Om" button
restartBtn.addEventListener('click', startGame);
 
// Start the game when the page loads
startGame();