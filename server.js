const server = require('express')();
const http = require('http').createServer(server);
const cors = require('cors');
const shuffle = require('shuffle-array');
let players = {};
let readyCheck = 0;
let gameState = "Initializing";

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080', //clients will be making requests from port 8080
        methods: ["GET", "POST"],
    }
});


io.on('connection', function (socket) {
    console.log("User connected: " + socket.id);
    
    //using this so you can check if a card that a client sends is in their deck/hand
    players[socket.id] = {
        inDeck: [],
        inHand: [],
        isPlayerA: false
    }

    //first player to connect is player A, then emit firstTurn which changes that client's isMyTurn boolean to true
    if(Object.keys(players).length < 2){
        players[socket.id].isPlayerA = true;
        io.emit("firstTurn");
    }

    socket.on('dealDeck', function (socketId) {
        players[socketId].inDeck = shuffle(["boolean", "ping"]); //using names on server side to determine what cards will render on screen
        console.log('dealDeck');
        console.log(players);
        if(Object.keys(players).length < 2) return; //if there are less than 2 players, don't continue
        io.emit("changeGameState", "Initializing");
    })

    socket.on('dealCards', function (socketId) {
        for(let i = 0;i < 5; i++){
            if(players[socketId].inDeck.length === 0) { //if we already emptied the deck, just shuffle in another round of cards
                players[socketId].inDeck = shuffle(["boolean", "ping"]);
            }
            players[socketId].inHand.push(players[socketId].inDeck.shift()); //take the top card from the deck and put it into hand
        }
        console.log("Dealt Cards");
        console.log(players);
        io.emit('dealCards', socketId, players[socketId].inHand);
        readyCheck++;
        if(readyCheck >= 2){
            gameState = "Ready";
            io.emit('changeGameState', "Ready");
        }
    });

    socket.on('cardPlayed', function(cardName, socketId){
        io.emit('cardPlayed', cardName, socketId);
        io.emit('changeTurn');
    })

});

http.listen(3000, function() {
    console.log("server started!");
});