'use strict'

import { config } from './config/index.mjs'

import { Board } from './models/board.mjs'
import { Ship } from './models/ship.mjs'

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.gameInterval = null
    this.score = 0
    this.shipPosition = { x: 0, y: 0 }
    this.board = new Board({ canvas, ctx })
    this.ship = new Ship({ canvas, ctx })
  }

  setWindowListeners = () => {
    window.addEventListener('keydown', this.onKeyPress)
  }

  setWindowIntervals = () => {
    window.setInterval(this.updateShipPosition, 200)
  }

  updateShipPosition = () => {
    this.shipPosition = {
      ...this.shipPosition,
      y: this.shipPosition.y + 1
    }
  }

  clearCanvas = () => {
    const { height, width } = this.canvas

    this.ctx.clearRect(0, 0, width, height)
  }

  onKeyPress = ev => {
    console.log(this.shipPosition)

    switch (ev.key) {
      case 'ArrowLeft': {
        this.shipPosition = {
          ...this.shipPosition,
          x: this.shipPosition.x - 20
        }
      }
        break
      case 'ArrowRight':
        this.shipPosition = {
          ...this.shipPosition,
          x: this.shipPosition.x + 20
        }
        break
      case 'ArrowUp':
        // Up pressed
        break
      case 'ArrowDown':
        // Down pressed
        break
    }
  }

  update = () => {
    this.board.update()
    this.ship.update(this.shipPosition)
  }

  render = () => {
    this.board.render()
    this.ship.render()
  }

  stop = () => {
    clearInterval(this.gameInterval)
  }

  start = () => {
    this.setWindowListeners()
    this.setWindowIntervals()

    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.update()
      this.render()
    }, config.gameUpdateInterval)
  }
}
