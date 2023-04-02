import { expect } from "chai";
import { buildDeck } from "../../deck.js";
import { makeHand } from "../../handMaker.js";

// straight = suite

describe('poker hands creation', () => {
    
    it('manages straight', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck,7,'diamond'))
        cards.push(getCard(deck,5,'club'))
        cards.push(getCard(deck,4,'heart'))
        cards.push(getCard(deck,3,'club'))
        cards.push(getCard(deck,6,'spade'))
        
        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)

        expect(hand.type).to.equal('straight')
        expect(hand.rank).to.equal(7)
    });

    it('manages ace-high straight', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck,13,'diamond'))
        cards.push(getCard(deck,1,'club'))
        cards.push(getCard(deck,10,'heart'))
        cards.push(getCard(deck,11,'club'))
        cards.push(getCard(deck,12,'spade'))
        
        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)

        expect(hand.type).to.equal('straight')
        expect(hand.rank).to.equal(1)
    });
});

function getCard(deck,rank,suit){
    const idx = deck.findIndex((c)=>c.suit === suit && c.rank === rank)
    const card = deck.splice(idx,1)[0]
    return card
}