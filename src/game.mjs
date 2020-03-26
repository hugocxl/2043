'use strict'

import { config } from './config/index.mjs'

import { Board } from './models/board.mjs'
import { Spaceship } from './models/spaceship.mjs'

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.gameInterval = null
    this.score = 0
    this.spaceshipPosition = { x: 0, y: 0 }
    this.board = new Board({ canvas, ctx })
    this.spaceship = new Spaceship({ canvas, ctx })
  }

  setWindowListeners = () => {
    window.addEventListener('keydown', this.onKeyPress)
  }

  setWindowIntervals = () => {
    window.setInterval(this.updateShipPosition, 200)
  }

  updateShipPosition = () => {
    this.spaceshipPosition = {
      ...this.spaceshipPosition,
      y: this.spaceshipPosition.y + 1
    }
  }

  clearCanvas = () => {
    const { height, width } = this.canvas

    this.ctx.clearRect(0, 0, width, height)
  }

  onKeyPress = ev => {
    console.log(this.spaceshipPosition)

    switch (ev.key) {
      case 'ArrowLeft': {
        this.spaceshipPosition = {
          ...this.spaceshipPosition,
          x: this.spaceshipPosition.x - 1
        }
      }
        break
      case 'ArrowRight':
        this.spaceshipPosition = {
          ...this.spaceshipPosition,
          x: this.spaceshipPosition.x + 1
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

  render = () => {
    this.board.render()
    this.spaceship.render()
  }

  stop = () => {
    clearInterval(this.gameInterval)
  }

  start = () => {
    this.setWindowListeners()
    this.setWindowIntervals()

    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.render()
    }, config.gameUpdateInterval)
  }
}
