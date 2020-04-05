'use strict'

import { SCALE_UNIT } from '../constants/index.mjs'

export const config = {
  gameFPS: 1000 / 60,
  viewPointHeight: 1 * SCALE_UNIT,
  addItemTimeout: {
    obstacle: 50,
    cloud: 2500,
  },
  speed: {
    obstacle: 1000,
    cloud: 2500,
    ship: 100
  }
}

export const worldConfigScheme = {
  obstacle: {
    width: 5 * SCALE_UNIT,
    height: 20 * SCALE_UNIT * Math.random(),
    length: 1 * SCALE_UNIT,
    color: ['50', '50', '50'],
    speed: 10,
    position: {
      x: Math.random() * 10 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1),
      y: 500 * SCALE_UNIT
    },
    interval: 50,
    limit: 500
  },
  cloud: {
    width: 2000 * SCALE_UNIT * Math.random(),
    height: 200 * SCALE_UNIT * Math.random(),
    length: 5000 * SCALE_UNIT * Math.random(),
    elevation: 5000 * SCALE_UNIT * Math.random(),
    color: ['50', '50', '50'],
    d: {
      x: Math.random() * 5000 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1),
      y: 10000 * SCALE_UNIT
    },
    interval: 2500,
    limit: 30
  },
  sun: {
    color: ['50', '50', '50'],
    diameter: 100
  }
}
