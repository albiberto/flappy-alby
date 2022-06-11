import {Area} from "./core/area.js";
import {OverlayService} from "./services/overlayService.js";
import {LevelService} from "./services/levelService.js";
import {Option} from "./model/options.js";
import {Game} from "./game.js";
import {Coordinate} from "./model/coordinate.js";
import {LivesService} from "./services/livesService.js";
import {PercentageService} from "./services/percentageService.js";

import {RankingClient} from "./clients/rankingClient.js";
import {SpeedService} from "./services/speedService.js";

(function () {
    const area = document.getElementById('area');

    const overlay = document.getElementById('overlay');
    const overlay_title = document.getElementById('overlay-title');
    const overlay_score = document.getElementById('overlay-score');
    const overlay_leaderboard = document.getElementById('overlay-leaderboard');
    const overlay_player = document.getElementById('overlay-player');
    const overlay_player_input = document.getElementById('overlay-player-input');
    const overlay_button = document.getElementById('overlay-button');

    const level = document.getElementById('level');
    const percentage = document.getElementById('percentage');
    const speed = document.getElementById('speed');
    const lives = document.getElementById('lives');

    document.addEventListener('DOMContentLoaded', () => {
        const coordinate = new Coordinate(0, 0, area.clientHeight, area.clientWidth);
        const levels = buildLevels(coordinate);

        const rankingClient = new RankingClient();

        const levelService = new LevelService(level, levels);
        const percentageService = new PercentageService(percentage);
        const speedService = new SpeedService(speed, coordinate);
        const livesService = new LivesService(lives);

        const overlayService = new OverlayService(overlay, overlay_title, overlay_score, overlay_leaderboard, overlay_player, overlay_player_input, overlay_button);

        const game = new Game(new Area(area, coordinate), overlayService, levelService, percentageService, speedService, livesService, rankingClient);
        overlay_button.onclick = async () => {
            const level = await game.nextLevel();
            level?.();
        };
    });

    function buildLevels(coordinate) {
        const levelsOptions = [];
        for (let i = 1; i < 6; i++) {
            const playerSide = coordinate.width / 20;
            const playerCoordinate = new Coordinate((coordinate.height - playerSide) / 2, coordinate.width * .1, playerSide, playerSide);
            levelsOptions.push(new Option(playerCoordinate, i / 2, i / 2 + 2, i * 5000));
        }

        return levelsOptions;
    }
})();
