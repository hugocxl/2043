'use strict'

import { SCALE_UNIT } from '../constants/index.mjs'

export const config = {
  gameUpdateInterval: 1000 / 60,
  viewPointHeight: 50 * SCALE_UNIT,
  addItemTimeout: {
    obstacle: 50,
    cloud: 2500,
  },
  speed: {
    obstacle: 1500,
    cloud: 3000,
    ship: 20
  }
}
