import { byRank, makeHand } from "./handMaker.js"

function buildRandomHand(deck) {
    const hand = []
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.sort(byRank)
    return hand
}

function buildHighCard(deck) {
    let hand = null
    do {
        if (hand) {
            deck.push(...hand)
        }
        hand = buildRandomHand(deck)
    }
    while (makeHand(hand).type != 'high')
    hand.sort(byRank)
    return hand
}

function buildPair(deck) {
    let hand = buildHighCard(deck) // genere une main (une high card est une main sans rien, 5 cartes differetes)
    hand.sort(byRank)
    let idx = deck.findIndex((c) => c.rank === hand[0].rank) // cherche une carte de meme valeur que la plus haute carte
    let tmp = hand[1] // memorise la 2e carte de la main 
    hand[1] = deck.splice(idx, 1)[0] // remplace la carte précédente (tmp) (splice veut dire enlever carte du deck et la met ds la main)
    deck.push(tmp) // remet ds le deck la carte inutile
    
    return hand
}

function buildDoublePair(deck) {
   let hand = buildPair(deck) //genere a partir de la paire precedement definie
   hand.sort(byRank)
   let idx = deck.findIndex((c) => c.rank === hand[1].rank) // cherche la 2e plus grande pr la 2e paire
   let tmp = hand[2] // memorise la 3e carte de la main 
   hand[2] = deck.splice(idx, 2)[1] // remplace la carté précédente (tmp)
   deck.push(tmp) // remet ds le deck la carte inutile

   return hand
}

function buildThreeOfAKind(deck) {
    let hand = buildPair(deck) //genere a partir de la paire precedement definie
    hand.sort(byRank)
    let idx = deck.findIndex((c) => c.rank === hand[0].rank) // cherche une carte de meme valeur que la plus haute carte
    let tmp = hand[2] // memorise la 3e carte de la main 
    hand[1] = deck.splice(idx, 1)[0] // remplace la carté précédente (tmp)
    deck.push(tmp) // remet ds le deck la carte inutile
    
    return hand
}  

function buildQuad(deck) {
    let hand = buildThreeOfAKind(deck) //genere a partir du brelan precedement defini
    hand.sort(byRank)
    let idx = deck.findIndex((c) => c.rank === hand[0].rank) // cherche une carte de meme valeur que la plus haute carte
    let tmp = hand[3] // memorise la 4e carte de la main
    hand[1] = deck.splice(idx, 1)[0] // remplace la carté précédente (tmp)
    deck.push(tmp) // remet ds le deck la carte inutile
    
    return hand
}

function buildFull(deck) {
    let three = buildThreeOfAKind(deck)
    let pair = buildPair(deck)
    let hand = three + pair

    return hand
}

export { buildRandomHand,buildHighCard,buildPair,buildDoublePair,buildThreeOfAKind,buildQuad, buildFull }