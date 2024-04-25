const modal = document.getElementById("instructionsModal");
const btn = document.getElementById("instructions");
const span = document.getElementsByClassName("close")[0];

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        const playerPrefix = this.id.split('-')[0];
        document.querySelectorAll(`#${playerPrefix}colour .color-swatch`).forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
    });
});


function startGame(player1Name, player1Colour, player2Name, player2Colour) {
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player1Colour', player1Colour);
    localStorage.setItem('player2Name', player2Name);
    localStorage.setItem('player2Colour', player2Colour);

    window.location.href = '../C4/game.html';
}

document.getElementById('startgame').addEventListener('click', function() {
    const player1Name = document.getElementById('p1name').value;
    const player1Colour = document.querySelector('#p1colour .selected').getAttribute('data-color');
    const player2Name = document.getElementById('p2name').value;
    const player2Colour = document.querySelector('#p2colour .selected').getAttribute('data-color');

    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player1Colour', player1Colour);
    localStorage.setItem('player2Name', player2Name);
    localStorage.setItem('player2Colour', player2Colour);

    window.location.href = '../C4/game.html';
});