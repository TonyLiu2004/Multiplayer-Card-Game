import ZoneHandler from "./ZoneHandler";
export default class UIHandler {
    constructor (scene) {

        this.zoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {
            scene.dropZone = this.zoneHandler.renderZone(500, 500);
            this.zoneHandler.renderOutline(scene.dropZone);
        }

        this.buildPlayerAreas = () => {
            scene.playerHandArea = scene.add.rectangle(500, 860, 850, 230); // (x, y, width, height)
            scene.playerHandArea.setStrokeStyle(4,0xff69b4);
            scene.playerDeckArea = scene.add.rectangle(1050,860,155,215);
            scene.playerDeckArea.setStrokeStyle(3, 0x00ffff);

            scene.opponentHandArea = scene.add.rectangle(500, 135, 850, 230); // (x, y, width, height)
            scene.opponentHandArea.setStrokeStyle(4,0xff69b4);
            scene.opponentDeckArea = scene.add.rectangle(1050,135,155,215);
            scene.opponentDeckArea.setStrokeStyle(3, 0x00ffff);
        }

        this.buildGameText = () => {
            scene.dealCards = scene.add.text(990, 445, "Deal Cards").setFontSize(24).setFontFamily("Trebuchet MS");
        }

        this.buildUI = () => {
            this.buildZones();
            this.buildPlayerAreas();
            this.buildGameText();
        }
    }
}