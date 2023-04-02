function buildDeck() {

  const deck = []
  const suits = ['spade', 'club', 'diamond', 'heart']
  for (let suitIdx = 0; suitIdx < 4; suitIdx++) {
    for (let rank = 1; rank <= 13; rank++) {
      deck.push({ suit: suits[suitIdx], rank })
    }
  }

  function shuffle(array) {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  shuffle(deck)
  return deck
}


function getCard(deck, rank, suit = 'any') {
  let idx = -1
  if (suit === 'any'){
    idx = deck.findIndex((c) => c.rank === rank)
  }
  else {
    idx = deck.findIndex((c) => c.suit === suit && c.rank === rank)
  }
  if (idx < 0) {
    throw new Error('card not found')
  }
  const card = deck.splice(idx, 1)[0]
  return card
}

export { buildDeck, getCard }