export default class InteractiveHandler {
    constructor(scene) {
        //When a client clicks on deal cards button and it is interactive, it should send a message to the server using socket.io to deal cards, then disable dealcards button to prevent multiple clicks
        scene.dealCards.on("pointerdown", () => {
            scene.socket.emit("dealCards", scene.socket.id);
            scene.dealCards.disableInteractive(); 
        })

        scene.dealCards.on('pointerover', () => {
            scene.dealCards.setColor('#ff69b4');
        })

        scene.dealCards.on('pointerout', () => {
            scene.dealCards.setColor("#00ffff");
        })

        scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        
        scene.input.on("dragstart", (pointer, gameObject) => {
            gameObject.setTint(0xff69b4); //set tint to card when dragging
            scene.children.bringToTop(gameObject);
        })

        scene.input.on("dragend", (pointer, gameObject, dropped) => {
            gameObject.setTint(); //remove tint
            if (!dropped) { //if the card was not dragged into dropzone, send it back to where it started
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        scene.input.on("drop", (pointer, gameObject, dropZone) => {
            if(scene.GameHandler.isMyTurn && scene.GameHandler.gameState === "Ready"){
                gameObject.x = (dropZone.x - 320) + (dropZone.data.values.cards * 50);
                gameObject.y = dropZone.y;
                //this is how you access data values of a game object in phaser
                scene.dropZone.data.values.cards++;
                scene.input.setDraggable(gameObject, false);
                scene.socket.emit("cardPlayed", gameObject.data.values.name, scene.socket.id);
            } else {
                console.log("not your turn");
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })
    }
}