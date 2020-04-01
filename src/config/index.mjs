'use strict'

import { SCALE_UNIT } from '../constants/index.mjs'

export const config = {
  gameUpdateInterval: 1000 / 60,
  viewPointHeight: 1 * SCALE_UNIT,
  addItemTimeout: {
    obstacle: 20,
    cloud: 20,
  },
  speed: {
    obstacle: 10000,
    cloud: 10000,
    ship: 50
  }
}
