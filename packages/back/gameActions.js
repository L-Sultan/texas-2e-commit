import { buildDeck } from "shared/deck.js";

function createGame(players) {
    let game = { started: false, players, deck: buildDeck(), dealer: null, currentPlayer: null }
    return game
}

function getNextPlayer(game) {
    let curIdx = game.players.indexOf(game.currentPlayer)
    let nextIdx = (curIdx + 1) % game.players.length
    // if (game.players.length > 2) {
    //     nextIdx = 1
    // }
    return game.players[nextIdx]
}
const listFreeSeats = (seats) => {
    // console.log(game.players, game.players[0]);
    let freeSeats = seats.filter((s) => s == undefined).map((s, i) => i + 1)
    // console.log(seats);
    return freeSeats
}


function removePlayer(game, seat) {
    game.players.find((p)=>p.seat===seat).cards = null;
}

function updateStack(player, amount) {
    player.stack -= amount;
   player.bet += amount;
}

function startGame(game) {
    console.log("start...");
    game.dealer = game.players[Math.random() * game.players.length]
    // game.players.some((p) => p != undefined)
    // game.dealer = newPlayer
    game.currentPlayer = game.dealer
    game.currentPlayer = getNextPlayer(game)
    console.log(game.currentPlayer.name);

    console.log("current", game.currentPlayer.name);
    game.currentPlayer = getNextPlayer(game)
    console.log("current", game.currentPlayer.name);
    game.started = true;
}

function dealAllPocketCards(game) {
    for (let player of game.players) {
        console.log("deal", player.name);
        dealFlop(game)
        broadcast(game, "flop", game.flop);

        // Deal pocket cards
        dealPocketCards(game, player);
        player.socket.emit("deal", { seat: player.seat, cards: player.cards });
        broadcast(game, "deal", { seat: player.seat }, player.seat);
    }

    // Deal turn
    dealTurn(game);
    broadcast(game, "turn", game.turn);
}




function dealPocketCards(game, player) {
    let cards = [game.deck.pop(), game.deck.pop()];
    game.players.find((p)=>p.seat===player.seat).cards = cards;
}
function dealFlop(game) {
    let flop = [game.deck.pop(), game.deck.pop(), game.deck.pop()];
    game.flop = flop;
}

function dealTurn(game){
    let turn = [game.deck.pop()];
    game.turn = turn;
}


function dealRiver(game){
    let river = [game.deck.pop()];
    game.river = river;
}

function playRound(game) {
    console.log("Play round...");
    dealAllPocketCards(game);

    // First betting round
    startBettingRound(game);
    while (!roundIsOver(game)) {
        let player = game.currentPlayer;
        player.socket.emit("turn", { currentPlayer: player.seat });
        // Wait for player to make a move
        // ...
    }

    // Deal the turn card
    dealTurn(game);

    // Second betting round
    startBettingRound(game);
    while (!roundIsOver(game)) {
        let player = game.currentPlayer;
        player.socket.emit("turn", { currentPlayer: player.seat });
        // Wait for player to make a move
        // ...
    }

    // ... continue with river and showdown
    dealRiver(game)
}


function broadcast(game, event, data, exceptSeat) {
    for (let player of game.players) {
        if (player.seat != exceptSeat) {
            // console.log("broadcast:", player);
            player.socket.emit(event, data);
        }
    }
}

function roundIsOver(game) {
    let bets = game.players.map((p) => p.bet)
    let max = Math.max(...bets)
    console.log(bets,max);
    return bets.every((b) => b === max)
}

export { createGame, listFreeSeats, removePlayer, updateStack, startGame, broadcast, dealAllPocketCards, getNextPlayer, roundIsOver, dealTurn, dealRiver, playRound }