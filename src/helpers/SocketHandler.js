import io from "socket.io-client";

export default class SocketHandler{
    constructor(scene){
        scene.socket = io('http://localhost:3000'); //where our server is listening

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('dealDeck', scene.socket.id);
        })

        scene.socket.on("firstTurn", () => {
            console.log("FIRST TURN");
            scene.GameHandler.changeTurn(); //since when game starts it is no one's turn, the client that receives this will change its isMyTurn boolean to true
        })
        
        scene.socket.on("changeGameState", (gameState) => {
            scene.GameHandler.changeGameState(gameState);
            if(gameState === "Initializing"){ //when the game starts, deal cards to both players and set them to interactive
                console.log("DEALING CARDS, deal cards should be interactive");
                scene.DeckHandler.dealCard(1050, 860, "cardBack", "playerCard").disableInteractive();
                scene.DeckHandler.dealCard(1050, 135, "cardBack", "opponentCard").disableInteractive();
                scene.dealCards.setInteractive();
                scene.dealCards.setColor("#00ffff");
            }
        })

        scene.socket.on("changeTurn", () => {
            scene.GameHandler.changeTurn();
        })

        //When a client send a dealCards message that includes the socketId, the server will send up the cards to all clients involved and deals cards to the client that sent the message
        scene.socket.on("dealCards", (socketId, cards) => {
            if(socketId === scene.socket.id) {
                for(let i in cards){
                    //start at 155, then add 155 for each card so they dont overlap
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(180 + (i * 155), 860, cards[i], "playerCard"));
                }
            } else { //not the same socket id, so add cards to opponent side
                for(let i in cards){
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(180 + (i * 155), 135, "cardBack", "opponentCard"));
                }
            }
        })

        scene.socket.on("cardPlayed", (cardName, socketId) => {
            //if opponent dragged and dropped the card, we need to render it on screen
            if(socketId !== scene.socket.id) {
                scene.GameHandler.opponentHand.shift().destroy(); //destroy 1 cardback from opponent's hand, then shift 1 card from opponent's hand since a card has been played
                scene.DeckHandler.dealCard((scene.dropZone.x - 320) + (scene.dropZone.data.values.cards * 50), scene.dropZone.y, cardName, "opponentCard"); //deck handler will deal cards using the cardName in the opponent side
                scene.dropZone.data.values.cards++; //no matter where the card comes from, need to increment
            }
        })
    }
}