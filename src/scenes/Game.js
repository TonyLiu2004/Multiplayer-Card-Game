import { Scene } from 'phaser';
import UIHandler from "../helpers/UIhandler";
import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import SocketHandler from "../helpers/SocketHandler";

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        console.log("in game");
        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);

        this.UIHandler = new UIHandler(this); // call UIHandler constructor in this scene
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);
    }
    update(){
        
    }
}
