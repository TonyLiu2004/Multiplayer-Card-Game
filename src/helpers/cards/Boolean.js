import Card from "./Card";

export default class Boolean extends Card{
    constructor(scene){
        super(scene);
        this.name = "boolean";
        this.playerCardSprite = "cyanBoolean";
        this.opponentCardSprite = "magentaBoolean";
    }
}