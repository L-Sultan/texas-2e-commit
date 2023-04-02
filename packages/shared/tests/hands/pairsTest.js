import { expect } from "chai";
import { buildDeck } from "../../deck.js";
import { makeHand } from "../../handMaker.js";

describe('poker hands creation', () => {

    it('manages high card', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck, 12, 'diamond'))
        cards.push(getCard(deck, 2, 'club'))
        cards.push(getCard(deck, 4, 'heart'))
        cards.push(getCard(deck, 13, 'club'))
        cards.push(getCard(deck, 8, 'spade'))

        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)

        expect(hand.type).to.equal('high')
        expect(hand.rank).to.equal(13)
        expect(hand.kickers).to.be.a('Array')
        expect(hand.kickers.length).to.be.equal(4)
        expect(hand.kickers[0].rank).to.equal(12)
    });

    describe('pairs creation', () => {
        it('manages simple pair', () => {
            const deck = buildDeck()
            const cards = []
            cards.push(getCard(deck, 13, 'diamond'))
            cards.push(getCard(deck, 2, 'club'))
            cards.push(getCard(deck, 4, 'heart'))
            cards.push(getCard(deck, 13, 'club'))
            cards.push(getCard(deck, 8, 'spade'))

            expect(cards).to.be.a('Array')
            expect(cards.length).to.equal(5)

            const hand = makeHand(cards)
            expect(hand.type).to.equal('pair')
            expect(hand.rank).to.equal(13)
            expect(hand.kickers).to.be.a('Array')
            expect(hand.kickers.length).to.be.equal(3)
            expect(hand.kickers[0].rank).to.equal(8)
        });

        it('manages double pair', () => {
            const deck = buildDeck()
            const cards = []
            cards.push(getCard(deck, 13, 'diamond'))
            cards.push(getCard(deck, 4, 'club'))
            cards.push(getCard(deck, 4, 'heart'))
            cards.push(getCard(deck, 13, 'club'))
            cards.push(getCard(deck, 8, 'spade'))

            expect(cards).to.be.a('Array')
            expect(cards.length).to.equal(5)

            const hand = makeHand(cards)
            expect(hand.type).to.equal('double')
            expect(hand.rank).to.equal(13)
            expect(hand.sideRank).to.equal(4)
            expect(hand.kickers).to.be.a('Array')
            expect(hand.kickers.length).to.be.equal(1)
            expect(hand.kickers[0].rank).to.equal(8)
        });

        it('manages three of a kind', () => {
            const deck = buildDeck()
            const cards = []
            cards.push(getCard(deck, 13, 'diamond'))
            cards.push(getCard(deck, 4, 'club'))
            cards.push(getCard(deck, 13, 'heart'))
            cards.push(getCard(deck, 13, 'club'))
            cards.push(getCard(deck, 8, 'spade'))

            expect(cards).to.be.a('Array')
            expect(cards.length).to.equal(5)

            const hand = makeHand(cards)
            expect(hand.type).to.equal('three')
            expect(hand.rank).to.equal(13)
            expect(hand.kickers).to.be.a('Array')
            expect(hand.kickers.length).to.be.equal(2)
            expect(hand.kickers[0].rank).to.equal(8)
        });

        it('manages quad', () => {
            const deck = buildDeck()
            const cards = []
            cards.push(getCard(deck, 13, 'diamond'))
            cards.push(getCard(deck, 4, 'club'))
            cards.push(getCard(deck, 13, 'heart'))
            cards.push(getCard(deck, 13, 'club'))
            cards.push(getCard(deck, 13, 'spade'))

            expect(cards).to.be.a('Array')
            expect(cards.length).to.equal(5)

            const hand = makeHand(cards)
            expect(hand.type).to.equal('quad')
            expect(hand.rank).to.equal(13)
            expect(hand.kickers).to.be.a('Array')
            expect(hand.kickers.length).to.be.equal(1)
            expect(hand.kickers[0].rank).to.equal(4)
        });
    });
});

function getCard(deck, rank, suit) {
    const idx = deck.findIndex((c) => c.suit === suit && c.rank === rank)
    const card = deck.splice(idx, 1)[0]
    return card
}