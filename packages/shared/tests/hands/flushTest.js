import { expect } from "chai";
import { buildDeck } from "../../deck.js";
import { makeHand } from "../../handMaker.js";

// 5 cartes meme famille (par ex full carreau)

describe('poker hands creation', () => {
    
    it('manages flush', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck,5,'diamond'))
        cards.push(getCard(deck,13,'diamond'))
        cards.push(getCard(deck,2,'diamond'))
        cards.push(getCard(deck,11,'diamond'))
        cards.push(getCard(deck,1,'diamond'))
        
        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)

        expect(hand.type).to.equal('flush')
        expect(hand.rank).to.equal(13)
    });
});

function getCard(deck,rank,suit){
    const idx = deck.findIndex((c)=>c.suit === suit && c.rank === rank)
    const card = deck.splice(idx,1)[0]
    return card
}