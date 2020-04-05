'use strict'

import { SCALE_UNIT } from '../constants/index.mjs'

export const config = {
  gameFPS: 1000 / 60,
  viewPointHeight: 50 * SCALE_UNIT,
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
    width: 50 * SCALE_UNIT,
    height: 200 * SCALE_UNIT * Math.random(),
    length: 10 * SCALE_UNIT,
    color: ['50', '50', '50'],
    d: {
      x: Math.random() * 1000 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1),
      y: 5000 * SCALE_UNIT
    },
    frecuency: 50
  },
  cloud: {
    width: 2000 * SCALE_UNIT * Math.random(),
    height: 200 * SCALE_UNIT * Math.random(),
    length: 5000 * SCALE_UNIT * Math.random(),
    elevation: 5000 * SCALE_UNIT * Math.random(),
    color: ['50', '50', '50'],
    d: {
      x: Math.random() * 5000 * SCALE_UNIT * (Math.round(Math.random()) * 2 - 1),
      y: 100000 * SCALE_UNIT
    },
    frecuency: 2500
  },
  sun: {
    color: ['50', '50', '50'],
    diameter: 100
  }
}
