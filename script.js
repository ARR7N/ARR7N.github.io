const modal = document.getElementById("instructionsModal");
const btn = document.getElementById("instructions");
const span = document.getElementsByClassName("close")[0];

//open modal
btn.onclick = () => modal.style.display = "block";
//close modal
span.onclick = () => modal.style.display = "none";
//close modal on click outside
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

//event listener for colour swatch
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        const playerPrefix = this.id.split('-')[0];
        document.querySelectorAll(`#${playerPrefix}colour .color-swatch`).forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
    });
});

//start game and store info in localst
function startGame(player1Name, player1Colour, player2Name, player2Colour) {
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player1Colour', player1Colour);
    localStorage.setItem('player2Name', player2Name);
    localStorage.setItem('player2Colour', player2Colour);
//redirect to game
    window.location.href = 'game.html';
}
//start
document.getElementById('startgame').addEventListener('click', function() {
    //retrieve info
    const player1Name = document.getElementById('p1name').value;
    const player1Colour = document.querySelector('#p1colour .selected').getAttribute('data-color');
    const player2Name = document.getElementById('p2name').value;
    const player2Colour = document.querySelector('#p2colour .selected').getAttribute('data-color');
    //store data in local
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player1Colour', player1Colour);
    localStorage.setItem('player2Name', player2Name);
    localStorage.setItem('player2Colour', player2Colour);

    window.location.href = 'game.html';
});