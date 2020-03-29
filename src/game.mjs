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
    this.perspectiveCenter = { x: canvas.width / 2, y: canvas.height / 2 }
    this.board = new Board({ canvas, ctx })
    // this.ship = new Ship({ canvas, ctx })
  }

  setWindowListeners = () => {
    window.addEventListener('keydown', this.onKeyPress)
  }

  setWindowIntervals = () => {
  }

  clearCanvas = () => {
    const { height, width } = this.canvas

    this.ctx.clearRect(0, 0, width, height)
  }

  onKeyPress = ev => {
    switch (ev.key) {
      case 'ArrowLeft': {
        this.perspectiveCenter = {
          ...this.perspectiveCenter,
          x: this.perspectiveCenter.x - 50
        }
      }
        break
      case 'ArrowRight':
        this.perspectiveCenter = {
          ...this.perspectiveCenter,
          x: this.perspectiveCenter.x + 50
        }
        break
      case 'ArrowUp':
        // Up pressed
        break
      case 'ArrowDown':
        // Down pressed
        break
    }

    this.update()
  }

  update = () => {
    this.board.update(this.perspectiveCenter)
    // this.ship.update(this.perspectiveCenter)
  }

  render = () => {
    this.board.render()
    // this.ship.render()
  }

  stop = () => {
    clearInterval(this.gameInterval)
  }

  start = () => {
    this.setWindowListeners()
    this.setWindowIntervals()
    this.board.init()

    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.render()
    }, config.gameUpdateInterval)
  }
}
