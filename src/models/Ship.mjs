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
        this.ship.style.transform = 'translateX(-15px) rotate(-0deg)'
        this.ship.style.transition = 'none'
        break
      }

      case KEYS.RIGHT: {
        this.ship.src = 'images/ship/ship-r1.png'
        // this.ship.style.transform = 'translateX(15px) rotate(0deg)'
        // this.ship.style.transition = 'none'
        break
      }

      case KEYS.UP: {
        this.ship.style.transform = 'translateY(-40px) scale(0.8)'
        this.ship.style.transition = 'all 1s ease'
        break
      }

      case KEYS.DOWN: {
        this.ship.style.transform = 'translateY(40px) scale(1.2)'
        this.ship.style.transition = 'all 1s ease'
        break
      }

      default: {
        this.ship.style.transform = 'none'
        this.ship.src = 'images/ship/ship-0.png'
      }
    }
  }

  start = () => {
    this.setListeners()
    this.setIntervals()
  }

  render = () => {
    // this.ctx.beginPath()
    // this.ctx.arc(this.canvas.width / 2, this.canvas.height + 50, 4 * 20, 0, Math.PI * 2, true)
    // this.ctx.closePath()
    // this.ctx.fillStyle = 'rgba(255,233,201,0.05)'
    // this.ctx.fill()

    // this.ctx.beginPath()
    // this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2)
    // this.ctx.lineTo(this.canvas.width / 2, this.canvas.height - 200)
    // this.ctx.closePath()
    // this.ctx.strokeStyle = 'rgba(255,233,201,1)'
    // this.ctx.stroke()
  }
}
