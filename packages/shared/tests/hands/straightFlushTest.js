import { expect } from "chai";
import { buildDeck } from "../../deck.js";
import { makeHand } from "../../handMaker.js";
 // suite + meme famille
describe('poker hands creation', () => {
    
    it('manages non-royal straight flush', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck,7,'diamond'))
        cards.push(getCard(deck,5,'diamond'))
        cards.push(getCard(deck,4,'diamond'))
        cards.push(getCard(deck,3,'diamond'))
        cards.push(getCard(deck,6,'diamond'))
        
        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)

        expect(hand.type).to.equal('straightflush')
        expect(hand.rank).to.equal(7)
    });

    it('manages royal straight flush', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck,12,'diamond'))
        cards.push(getCard(deck,13,'diamond'))
        cards.push(getCard(deck,1,'diamond'))
        cards.push(getCard(deck,10,'diamond'))
        cards.push(getCard(deck,11,'diamond'))
        
        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)

        expect(hand.type).to.equal('straightflush')
        expect(hand.rank).to.equal(1)
    });
});

function getCard(deck,rank,suit){
    const idx = deck.findIndex((c)=>c.suit === suit && c.rank === rank)
    const card = deck.splice(idx,1)[0]
    return card
}