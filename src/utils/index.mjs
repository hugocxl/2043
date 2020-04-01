export const utils = {
  getIntersectionPointsBetween2Lines,
  generateRandomObject
}

function getIntersectionPointsBetween2Lines (pA1, pA2, pB1, pB2) {
  if ((pA1.x === pA2.x && pA1.y === pA2.y) || (pB1.x === pB2.x && pB1.y === pB2.y)) {
    return false
  }

  const denominator = ((pB2.y - pB1.y) * (pA2.x - pA1.x) - (pB2.x - pB1.x) * (pA2.y - pA1.y))

  let ua = ((pB2.x - pB1.x) * (pA1.y - pB1.y) - (pB2.y - pB1.y) * (pA1.x - pB1.x)) / denominator

  return {
    x: pA1.x + ua * (pA2.x - pA1.x),
    y: pA1.y + ua * (pA2.y - pA1.y)
  }
}

function generateRandomObject () {
  const dx = Math.random() * 500000 * (Math.round(Math.random()) * 2 - 1)

  return {
    d: {
      x: dx,
      y: 1000000
    },
    width: 2000,
    height: 3000,
    length: 2000,
    elevation: 500000 * Math.random()
  }
}
