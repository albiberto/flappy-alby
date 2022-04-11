export class OverlayService {
    #overlay;
    #title
    #score;
    #leaderboard;
    #player;
    #playerInput;
    #button;

    constructor(overlay, title, score, leaderboard, player, playerInput, button) {
        this.#overlay = overlay;
        this.#title = title;
        this.#score = score;
        this.#leaderboard = leaderboard;
        this.#player = player;
        this.#playerInput = playerInput;
        this.#button = button;

        const selector = _ => this.#button.disabled = this.#playerInput.value.length < 3
        this.#playerInput.addEventListener('keydown', selector);
        this.#playerInput.addEventListener('input', selector);
        this.#playerInput.addEventListener('paste', selector);
    }

    get getName() {
        return this.#playerInput.value ?? '';
    }

    static #timesBuilder(stopwatch) {
        const final = stopwatch.final;
        const total = new Date(stopwatch.total);

        return `<p>Completed In: ${final.getMinutes().round2()}:${final.getSeconds().round2()}:${final.getMilliseconds().round2()}</p>
                <p>Total Time: ${total.getMinutes().round2()}:${total.getSeconds().round2()}:${total.getMilliseconds().round2()}</p>`;
    }

    startGame() {
        this.#overlay.style.display = 'none';
    }

    disable() {
        this.#button.disabled = true;
    }

    continue(stopwatch) {
        this.#overlay.style.display = 'flex';
        this.#score.style.display = 'block';
        this.#leaderboard.style.display = 'none';
        this.#player.style.display = 'none';

        this.#title.innerHTML = 'Continue ...';
        this.#button.innerHTML = 'Continue';

        this.#score.innerHTML = OverlayService.#timesBuilder(stopwatch);
    }

    levelOver(stopwatch, level = '') {
        this.#overlay.style.display = 'flex';
        this.#score.style.display = 'block';
        this.#leaderboard.style.display = 'none';
        this.#player.style.display = 'none';

        this.#title.innerHTML = `Level <span class='level'>${level}</span> Over!`;
        this.#button.innerHTML = 'Next Level';

        this.#score.innerHTML = OverlayService.#timesBuilder(stopwatch);
    }

    youLose(stopwatch) {
        this.#overlay.style.display = 'flex';
        this.#score.style.display = 'block';
        this.#leaderboard.style.display = 'none';
        this.#player.style.display = 'none';

        this.#title.innerHTML = 'You Lose!';
        this.#button.innerHTML = 'Retry';

        this.#score.innerHTML = OverlayService.#timesBuilder(stopwatch);
    }

    youWin(stopwatch) {
        this.#overlay.style.display = 'flex';
        this.#score.style.display = 'block';
        this.#leaderboard.style.display = 'none';
        this.#player.style.display = 'block';

        this.#title.innerHTML = 'You Win!';
        this.#button.innerHTML = 'End';

        this.#button.disabled = true;
        this.#playerInput.value = '';
        this.#score.innerHTML = OverlayService.#timesBuilder(stopwatch);
    }

    congratulations(leaders) {
        this.#leaderboard.style.display = 'block';
        this.#player.style.display = 'none';
        this.#score.style.display = 'none';
        this.#button.style.display = 'inline-block';
        this.#button.disabled = false;

        this.#title.innerHTML = 'Congratulations!';
        this.#button.innerHTML = 'Play Again';

        const result = JSON.parse(leaders);

        let board = '<ol>';
        result.forEach(leader => {
            const total = new Date(leader.total);
            board += `<li>${leader.name} - ${total.getMinutes().round2()}:${total.getSeconds().round2()}:${total.getMilliseconds().round2()}</li>`;
        });
        board += '</ol>';

        this.#leaderboard.innerHTML = board;
    }
}
