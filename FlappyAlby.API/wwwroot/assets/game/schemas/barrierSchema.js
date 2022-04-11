import {Helpers} from "../helpers/helpers.js";
import {Coordinate} from "../model/coordinate.js";

import {SchemaBase} from "./shemaBase.js";

export class BarrierSchema extends SchemaBase {
    static build(areaCoordinate, playerCoordinate) {
        let heightTop = Helpers.getRandom(0, areaCoordinate.height * .6);
        let fissure = Helpers.getRandom(playerCoordinate.height * 1.5, playerCoordinate.height * 3);
        let heightBottom = areaCoordinate.height - heightTop - fissure;

        let width = Helpers.getRandom(playerCoordinate.width, playerCoordinate.width * 2);

        let top = new Coordinate(0, areaCoordinate.width + width, heightTop, width);
        let bottom = new Coordinate(heightTop + fissure, areaCoordinate.width + width, heightBottom, width);

        return [top, bottom];
    }
}
