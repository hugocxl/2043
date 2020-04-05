'use strict'

import { SCALE_UNIT } from '../constants/index.mjs'

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

function generateObstacle (displacement) {
  const oX = Math.random() * 500 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1)
  const width = 5 * SCALE_UNIT
  const height = 50 * SCALE_UNIT * Math.random()
  const length = 1 * SCALE_UNIT

  return {
    position: {
      x: oX,
      y: 50 * SCALE_UNIT
    },
    width,
    height,
    length
  }
}

function generateCloud () {
  const oX = Math.random() * 5000 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1)
  const width = 2000 * SCALE_UNIT * Math.random()
  const height = 200 * SCALE_UNIT * Math.random()
  const length = 5000 * SCALE_UNIT * Math.random()
  const elevation = 5000 * SCALE_UNIT * Math.random()

  return {
    d: {
      x: oX,
      y: 100000 * SCALE_UNIT
    },
    width,
    height,
    length,
    elevation
  }
}

export const utils = {
  getIntersectionPointsBetween2Lines,
  generateCloud,
  generateObstacle,
}
