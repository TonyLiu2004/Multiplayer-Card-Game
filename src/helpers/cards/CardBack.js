import Card from "./Card";

export default class CardBack extends Card{
    constructor(scene){
        super(scene);
        this.name = "cardBack";
        this.playerCardSprite = "cyanCardBack";
        this.opponentCardSprite = "magentaCardBack";
    }
}