import {Ai} from "./core/ai.js";
import {Player} from "./core/player.js";
import {BarrierSchema} from "./schemas/barrierSchema.js";
import {Stopwatch} from "./core/stopwatch.js";

export class Game {
    #area;
    #overlayService;

    #percentageService;
    #speedService
    #levelService;
    #livesService;

    #rankingClient;

    #player;
    #ai;
    #stopwatch;

    #finalLevelOver = false;

    constructor(area, overlayService, levelService, percentageService, speedService, livesService, rankingClient) {
        this.#area = area;
        this.#overlayService = overlayService;

        this.#levelService = levelService;
        this.#percentageService = percentageService;
        this.#speedService = speedService;
        this.#livesService = livesService;

        this.#rankingClient = rankingClient;
    }

    async nextLevel() {
        if (this.#finalLevelOver) {
            this.#overlayService.disable();
            const leaders = await this.#rankingClient.send(this.#overlayService.getName, this.#stopwatch.total);
            this.#overlayService.congratulations(leaders);
            this.#finalLevelOver = false;
            return;
        }

        if (this.#levelService.first && !this.#livesService.alive) {
            this.#livesService.recover();
            this.#stopwatch = new Stopwatch();
        }

        const options = this.#levelService.currentOptions;
        this.#player = new Player(this.#area, options.coordinate, options.playerSteps);

        const schema = BarrierSchema.build;
        this.#ai = new Ai(this.#area, schema, this.#onStepOver);

        return () => {
            this.#overlayService.startGame();

            this.#levelService.update();
            this.#percentageService.start();
            this.#speedService.start();
            this.#livesService.update();

            this.#stopwatch.start(options.finalTime);
            this.#ai.start(this.#player.coordinate, options.steps);
        }
    }

    #onStepOver = async timestamp => {
        this.#speedService.calculate(this.#player.coordinate);
        this.#stopwatch.detect(timestamp, this.#speedService.speed);
        this.#percentageService.calculate(this.#stopwatch);

        const gameOver = await this.#onGameOver();
        if (gameOver) return false;

        const levelOver = await this.#onLevelOver();
        return !levelOver;
    }

    #stop() {
        this.#ai.stop();

        this.#player.dispose();
        this.#player = undefined;

        this.#speedService.stop();
        this.#percentageService.stop();
    }

    // look at collisions and kills player or consumes lives
    #onGameOver() {
        // GAME Status Table                | crashed   | alive |
        // Game Over   (you LOOSE)          | 1         | 0     |
        // Kill        (CONTINUE)           | 1         | 1     |
        const crashed = this.#ai.crash(this.#player.coordinate);
        if (crashed) {
            this.#stop();

            this.#livesService.decrease();
            this.#livesService.update();

            const alive = this.#livesService.alive;
            if (alive) {
                // USE REMAINING LIVES (CONTINUE) => players.count > 0
                this.#stopwatch.lap();
                this.#overlayService.continue(this.#stopwatch);
            } else {
                // Game Over (you LOOSE)  =>  players.count <= 0
                this.#stopwatch.stop();
                this.#overlayService.youLose(this.#stopwatch, async () => await this.#rankingClient.get());
                this.#levelService.reset();
            }
        }

        return crashed;
    }

    // lock at score complete and kill player without consume lives
    async #onLevelOver() {
        // LEVEL Status Table               | levelOver | final |
        // Next level  (NEXT Level)         | 1         | 0     |
        // Game Over   (you WIN)            | 1         | 1     |
        const levelOver = this.#stopwatch.over;
        if (levelOver) {
            this.#stop();

            const final = this.#levelService.final;
            if (final) {
                // FINAL LEVEL COMPLETE, YOU WIN (you WIN) => levelIndex > totalLevels
                this.#stopwatch.stop();
                this.#overlayService.youWin(this.#stopwatch);
                this.#livesService.kill();
                this.#levelService.reset();
                this.#finalLevelOver = true;
            } else {
                // SOME REMAINING LEVELS (NEXT Level) => levelIndex <= totalLevels
                this.#stopwatch.lap();
                this.#overlayService.levelOver(this.#stopwatch, this.#levelService.level);
                this.#levelService.increase();
            }
        }

        return levelOver;
    }
}
