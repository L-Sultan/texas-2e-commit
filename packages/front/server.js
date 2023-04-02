// import { addButtons as addPlayingButtons } from "./actions.js";

function createServer(scene) {

    let server = io("localhost:3000");

    // console.log("create");

    // server.on("connect", () => {
        // let seat = null
        // if(localStorage.getItem("seat"){
        //     seat = parseInt(localStorage.getItem("seat"))
        // }
        // if(!seat){
            // server.emit("listSeats")
        // }
    // })
    
    server.on("listSeats", (freeSeats) => {
        console.log("list seats",freeSeats);
        let name = server.id
        if(localStorage.getItem('name')){
            name = localStorage.getItem('name')
        }
        localStorage.setItem('name',name)
        console.log("nom:",name);
        let seat = freeSeats[Math.floor(Math.random() * freeSeats.length)]
        let stack = 1000
        scene.player = {seat,name,stack}
        console.log("player",scene.player);
        server.emit("join", scene.player)
    })
    server.on("join", (player) => {
        console.log("new player:", player);
        player.cardsSprites = []
        scene.seats[player.seat-1] = player
        // scene.players[data.name] = data
    })
    server.on("bet", ({ seat, amount }) => {
        console.log(seat, "bet", amount);
    })
    server.on("fold", (seat) => {
        console.log(seat, "fold");
    })
    server.on("active", (data) => {
        scene.showPlayingButtons()
    })
    server.on("unactive", (data) => {
        scene.hidePlayingButtons()
    })
    server.on("deal", (data) => {
        if (data.seat === scene.player.seat) {
            scene.dealOpenCards(data.seat,data.cards)
        }
        else{
            scene.dealClosedCards(data.seat)
        }
    })
    server.on("flop", (data) => {
            scene.dealFlop(data)
    })
    server.on("winners", (data) => {
        console.log("winners", data);
        if (data.map((w)=>w.seat).includes(scene.player.seat)) {
            console.log("gagné!");
        }
        else {
            console.log("perdu!");
        }
    })
    server.on("game-over", (data) => {
        server.emit("show", scene.player.seat)
    })
    server.on("show", (data) => {
        scene.showCards(data.seat,data.cards)
    })
    return server
}

export { createServer }