'use strict'

import {
  GAME_UPDATE_INTERVAL,
} from './config.mjs'

import { Board } from './board.mjs'
import { Spaceship } from './spaceship.mjs'

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.gameInterval = null
    this.score = 0
    this.perspectiveCenter = { x: canvas.width / 2, y: canvas.height / 2 }
    this.board = new Board({ canvas, ctx })
    this.spaceship = new Spaceship({ canvas, ctx })
  }

  clearCanvas = () => {
    const { height, width } = this.canvas
    this.ctx.clearRect(0, 0, width, height)
  }

  updateScore = () => {
  }

  updateModels = () => {
    this.board.perspectiveCenter = this.perspectiveCenter
    this.spaceship.perspectiveCenter = this.perspectiveCenter
  }

  render = () => {
    this.board.render()
    this.spaceship.render()
  }

  start = () => {
    this.gameInterval = window.setInterval(() => {
      this.clearCanvas()
      this.updateModels()
      this.updateScore()
      this.render()
    }, GAME_UPDATE_INTERVAL)
  }
}
