'use strict'

import { SCALE_UNIT } from '../constants/index.mjs'
import { config } from '../config/index.mjs'

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

function generateObstacle ({ u, color }) {
  const a = Math.random()

  const width = 500
  const height = 500
  const length = 500
  const oX = 5000 * (Math.random() * 2 - 1)

  return {
    width,
    height,
    length,
    color: [color, color, color],
    speed: 150,
    position: {
      x: oX,
      y: 25000
    },
  }
}

function generateCloud ({ u, color }) {
  // const oX = Math.random() * 5000 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1)
  // const width = 1000 * SCALE_UNIT * Math.random()
  // const height = 200 * SCALE_UNIT * Math.random()
  // const length = 1000 * SCALE_UNIT * Math.random()

  const elevation = 10000 * SCALE_UNIT * Math.random()
  const width = u * 100 * SCALE_UNIT * Math.random()
  const height = u * 10 * SCALE_UNIT * Math.random()
  const length = u * 100 * SCALE_UNIT * Math.random()
  const oX = Math.random() * u * 1000 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1)

  return {
    width,
    height,
    length,
    color: [color, color, color],
    speed: u * 10,
    position: {
      x: oX,
      y: 1000 * SCALE_UNIT
    },
    elevation
  }
}

function generateWorld (i) {
  const u = i
  const color = 50

  return {
    obstacle: {
      limit: 100,
      interval: 100,
      color,
      u,
    },
    cloud: {
      limit: 25,
      interval: 50,
      color,
      u,
    }
  }
}

export const utils = {
  getIntersectionPointsBetween2Lines,
  generateCloud,
  generateObstacle,
  generateWorld,
}
