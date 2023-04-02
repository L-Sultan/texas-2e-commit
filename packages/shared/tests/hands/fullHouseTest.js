import { expect } from "chai";
import { buildDeck } from "../../deck.js";
import { makeHand } from "../../handMaker.js";

describe('poker hands creation', () => {
    
    it('manages full house', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck,7,'diamond'))
        cards.push(getCard(deck,5,'club'))
        cards.push(getCard(deck,7,'heart'))
        cards.push(getCard(deck,5,'heart'))
        cards.push(getCard(deck,7,'spade'))
        
        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)

        expect(hand.type).to.equal('fullhouse')
        expect(hand.rank).to.equal(7)
        expect(hand.sideRank).to.equal(5)
    });
});

function getCard(deck,rank,suit){
    const idx = deck.findIndex((c)=>c.suit === suit && c.rank === rank)
    const card = deck.splice(idx,1)[0]
    return card
}