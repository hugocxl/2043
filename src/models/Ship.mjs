'use strict'

import { KEYS } from '../constants/index.mjs'

export class Ship {
  constructor ({ ctx, canvas }) {
    this.canvas = canvas
    this.ctx = ctx
    this.pressedKey = null
    this.ship = document.getElementById('x2043__ship')
  }

  setListeners = () => {
    addEventListener('keydown', ({ key }) => {
      this.pressedKey = key
    }, true)

    addEventListener('keyup', () => {
      this.pressedKey = null
    }, true)
  }

  setIntervals = () => {
    setInterval(this.onKeyPress, 10)
  }

  onKeyPress = () => {
    switch (this.pressedKey) {
      case KEYS.LEFT: {
        this.ship.style.transform = 'translateX(-10px) rotate(-1deg)'
        break
      }

      case KEYS.RIGHT: {
        this.ship.style.transform = 'translateX(10px) rotate(1deg)'
        break
      }

      default: {
        this.ship.style.transform = 'none'
      }
    }
  }

  start = () => {
    this.setListeners()
    this.setIntervals()
  }

  render = () => {
    this.ctx.beginPath()
    this.ctx.arc(this.canvas / 2, this.canvas.height, 4 * 20, 0, Math.PI * 2, true)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgba(255,233,201,0.05)'
    this.ctx.fill()
  }
}
