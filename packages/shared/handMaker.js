function makeHand(origCards) {
    const cardsByRank = [...origCards]
    cardsByRank.sort(byRank)
    //TODO : all other kind of hands
    //Exemple:
    let counts = countPairs(origCards)
    if (isPair(counts)) {
        return makePair(cardsByRank) // à créer de la meme maniere que make single card
    }
    if (isDoublePair(counts)) {
        return makeDoublePair(cardsByRank)
    }
    if (isThreeOfAKind(counts)) {
        return makeThreeOfAKind(cardsByRank)
    }
    if (isQuad(counts)) {
        return makeQuad(cardsByRank)
    }
    return makeSingleCard(cardsByRank)
}
function getUniqueRanks(array) {
    const values = []
    for (const val of array) {
        if (!values.some((v) => v.rank === val.rank)) {
            values.push(val.rank)
        }
    }
    return values
}

function countPairs(hand) {
    let values = getUniqueRanks(hand)
    let counts = {}
    for (let val of values) {
        counts[val] = hand.filter((c) => c.rank === val).length
    }
    return counts
}

function makeSingleCard(cardsByRank) {
    const hand = {}
    hand.type = 'high'
    hand.rank = cardsByRank[0].rank
    hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
    return hand
}

function makePair(cardsByRank) {
    const hand = {}
    hand.type = 'pair'
    hand.rank = cardsByRank[0].rank
    hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
    return hand
}

function makeDoublePair(cardsByRank, counts) {
    const hand = {}
    hand.type = 'double'
    //let entries = Object.values(counts)
    //entries.sort()
    console.log("cardsByRank = ",cardsByRank)
    console.log("counts = ",counts)
    hand.rank = cardsByRank[0].rank
    hand.sideRank = cardsByRank[3].rank
    hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank).filter((c) => c.rank !== hand.sideRank)
    return hand
}

function makeThreeOfAKind(cardsByRank) {
    const hand = {}
    hand.type = 'three'
    hand.rank = cardsByRank[0].rank
    hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
    return hand
}

function makeQuad(cardsByRank) {
    const hand = {}
    hand.type = 'quad'
    hand.rank = cardsByRank[0].rank
    hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
    return hand
}

function byRank(c1, c2) {
    if (c1.rank === 1 && c2.rank === 1) {
        return 0
    }
    if (c1.rank === 1 && c2.rank > 1) {
        return 1
    }
    if (c2.rank === 1 && c1.rank > 1) {
        return -1
    }
    return c2.rank - c1.rank
}

function isQuad(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    
    if (entries[1] === 4 && entries [0] === 1) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isFullHouse(counts) {
    let res = false
    if (c1.rank == c2.rank && c1.rank == c3.rank && c1.rank !== c4.rank && c4.rank == c5.rank) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isThreeOfAKind(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    if (entries[2] === 3 && entries[1] === 1 && entries[0] === 1) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isDoublePair(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    if (entries[2] === 2 && entries[1] === 2 && entries[0] === 1) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isPair(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    
    if (entries[3] === 2 && entries[0] === 1 && entries[1] === 1 && entries[2] === 1) {
        res = true
    }
    else {
        res = false
    }
    console.log(counts)
    return res
}

export { makeHand, byRank, isPair, isDoublePair, isThreeOfAKind, isFullHouse, isQuad}