import { expect } from "chai";
import { buildDeck, getCard } from "../../deck.js";
import { makeHand } from "../../handMaker.js";
import { buildDoublePair, buildHighCard, buildPair, buildQuad, buildThreeOfAKind } from "../../handUtils.js";
import { findBestHand } from "../../handsComparator.js";

describe('poker hands comparator', () => {

    it('high card vs high card - kickers', () => {
        const deck = buildDeck()

        let high1 = []
        let high2 = []

        high1.push(getCard(deck, 2))
        high2.push(getCard(deck, 3))
        high1.push(getCard(deck, 4))
        high2.push(getCard(deck, 4))
        high1.push(getCard(deck, 5))
        high2.push(getCard(deck, 5))
        high1.push(getCard(deck, 8))
        high2.push(getCard(deck, 8))
        high1.push(getCard(deck, 10))
        high2.push(getCard(deck, 10))

        high1 = makeHand(high1)
        high2 = makeHand(high2)

        let winner = findBestHand([high2, high1])

        expect(winner).to.exist
        expect(winner.type).to.equal('high')
        expect(winner.kickers[3].rank).to.equal(3)
    });

    it('high card vs high card - no kicker', () => {
        const deck = buildDeck()

        let high1 = []
        let high2 = []

        high1.push(getCard(deck, 1))
        high2.push(getCard(deck, 1))
        high1.push(getCard(deck, 2))
        high2.push(getCard(deck, 2))
        high1.push(getCard(deck, 3))
        high2.push(getCard(deck, 3))
        high1.push(getCard(deck, 5))
        high2.push(getCard(deck, 5))
        high1.push(getCard(deck, 10))
        high2.push(getCard(deck, 10))


        high1 = makeHand(high1)
        high2 = makeHand(high2)

        let winner = findBestHand([high2, high1])

        expect(winner.type).to.equal('high')
    });

    // it('manages pair kicker', () => {
    //     const deck = buildDeck()

    //     let pair1 = buildPair(deck)
    //     pair1 = makeHand(pair1)
    //     let pair2 = buildPair(deck)
    //     if (pair1.rank !== makeHand(pair2).rank) {
    //         let idx = deck.findIndex((c) => c.rank === pair1.rank)
    //         let tmp = pair2[0]
    //         pair2[0] = deck.splice(idx, 1)[0]
    //         deck.push(tmp)
    //         idx = deck.findIndex((c) => c.rank === pair1.rank)
    //         tmp = pair2[1]
    //         pair2[1] = deck.splice(idx, 1)[0]
    //         deck.push(tmp)
    //         idx = deck.findIndex((c) => c.rank === pair1.rank)
    //         tmp = pair2[2]
    //         pair2[2] = deck.splice(idx, 1)[0]
    //         deck.push(tmp)
    //     }
    //     pair2 = makeHand(pair2)

    //     let winner = findBestHand([pair1, pair2])

    //     expect(winner.type).to.equal('pair')
    // });

    // it('simple pair beats high card', () => {
    //     const deck = buildDeck()

    //     let pair = buildPair(deck)
    //     pair = makeHand(pair)


    //     let high = buildHighCard(deck)
    //     high = makeHand(high)

    //     let winner = findBestHand([high, pair])

    //     expect(winner.type).to.equal('pair')
    // });

    // it('three of a kind beats pair', () => {
    //     const deck = buildDeck()

    //     let pair = buildPair(deck)
    //     pair = makeHand(pair)


    //     let three = buildThreeOfAKind(deck)
    //     three = makeHand(three)

    //     let winners = findWinners([three, pair])

    //     expect(winners).to.be.a('Array')
    //     expect(winners.length).to.equal(1)
    //     expect(winners[0].type).to.equal('three')
    // });

    // it('three of a kind beats double pair', () => {
    //     const deck = buildDeck()

    //     let pairs = buildDoublePair(deck)
    //     pairs = makeHand(pairs)


    //     let three = buildThreeOfAKind(deck)
    //     three = makeHand(three)
    //     let winners = findWinners([three, pairs])

    //     expect(winners).to.be.a('Array')
    //     expect(winners.length).to.equal(1)
    //     expect(winners[0].type).to.equal('three')
    // });

    // it('quad beats three of a kind', () => {
    //     const deck = buildDeck()

    //     let quad = buildQuad(deck)
    //     quad = makeHand(quad)


    //     let three = buildThreeOfAKind(deck)
    //     three = makeHand(three)
    //     let winners = findWinners([three, quad])

    //     expect(winners).to.be.a('Array')
    //     expect(winners.length).to.equal(1)
    //     expect(winners[0].type).to.equal('quad')
    // });

    // it('quad vs quad', () => {
    //     const deck = buildDeck()

    //     let quad1 = buildQuad(deck)
    //     quad1 = makeHand(quad1)

    //     let quad2 = buildQuad(deck)
    //     quad2 = makeHand(quad2)

    //     if (quad1.rank < quad2.rank) {
    //         [quad1, quad2] = [quad2, quad1]
    //     }
    //     let winners = findWinners([quad2, quad1])
    //     expect(winners).to.be.a('Array')
    //     expect(winners.length).to.equal(1)
    //     expect(winners[0].type).to.equal('quad')
    //     expect(winners[0].rank).to.equal(quad1.rank)
    // });
});