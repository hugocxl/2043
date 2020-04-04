'use strict'

import { config } from './config/index.mjs'
import { utils } from './utils/index.mjs'
import { Board, Ship, Obstacle, Cloud } from './models/index.mjs'
import { OBSTACLE, CLOUD, SCALE_UNIT } from './constants/index.mjs'

// Game controls the following params
// world instance
// ship instance
// score

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.gameInterval = null
    this.levelIntervals = null
    this.score = 0
    this.displacement = 0
    this.board = new Board({ canvas, ctx })
    this.ship = new Ship({ canvas, ctx })
    this.obstacles = []
    this.clouds = []
    this.pressedKey = null
  }

  setWindowListeners = () => {
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        this.pressedKey = 'ArrowLeft'
      }
      if (e.key === 'ArrowRight') {
        this.pressedKey = 'ArrowRight'
      }
      if (e.key === 'ArrowUp') {
        this.pressedKey = 'ArrowUp'
      }
      if (e.key === 'ArrowDown') {
        this.pressedKey = 'ArrowDown'
      }
    }, true)

    window.addEventListener('keyup', e => {
      this.pressedKey = null
    }, true)
  }

  setWindowIntervals = () => {
    setInterval(this.checkPressedKey, 10)
    setInterval(() => this.addItem(OBSTACLE), config.addItemTimeout.obstacle)
    setInterval(() => this.addItem(CLOUD), config.addItemTimeout.cloud)
  }

  addItem = item => {
    switch (item) {
      case OBSTACLE: {
        this.obstacles = [
          ...this.obstacles,
          new Obstacle({
            ctx: this.ctx,
            canvas: this.canvas,
            ...utils.generateObstacle(this.displacement)
          })
        ]
        break
      }

      case CLOUD : {
        if (this.clouds.length < 20) {
          this.clouds = [
            ...this.clouds,
            new Cloud({
              ctx: this.ctx,
              canvas: this.canvas,
              ...utils.generateCloud()
            })
          ]
          break
        }
      }

      default: {
        throw new Error('ITEM TYPE NOT SPECIFIED')
      }
    }
  }

  checkPressedKey = () => {
    switch (this.pressedKey) {
      case 'ArrowLeft': {
        this.displacement -= config.speed.ship
        this.move(-config.speed.ship)
      }
        break
      case 'ArrowRight':
        this.displacement += config.speed.ship
        this.move(config.speed.ship)
        break
    }
  }

  move = displacement => {
    this.board.move(displacement)

    const length = this.obstacles.length > this.clouds.length
      ? this.obstacles.length
      : this.clouds.length

    for (let i = 0; i < length; i++) {
      if (this.obstacles[i]) {
        this.obstacles[i].move(displacement)
      }

      if (this.clouds[i]) {
        this.clouds[i].move(displacement)
      }
    }
  }

  update = () => {
    const obstacles = []
    const clouds = []
    this.board.update()

    const length = this.obstacles.length > this.clouds.length
      ? this.obstacles.length
      : this.clouds.length

    for (let i = 0; i < length; i++) {
      if (this.obstacles[i] && this.obstacles[i].d.y + this.obstacles[i].length > 0) {
        // this.obstacles[i].update(this.displacement / 50)
        this.obstacles[i].update(0)
        obstacles.push(this.obstacles[i])
      }

      if (this.clouds[i] && this.clouds[i].d.y + this.clouds[i].length > 0) {
        this.clouds[i].update()
        clouds.push(this.clouds[i])
      }
    }

    this.obstacles = obstacles
    this.clouds = clouds
  }

  clearCanvas = () => {
    const { height, width } = this.canvas

    this.ctx.clearRect(0, 0, width, height)
  }

  render = () => {
    this.board.render()

    this.ship.render()

    for (let i = this.clouds.length; i > 0; i--) {
      this.clouds[i - 1].render()
    }

    for (let i = this.obstacles.length; i > 0; i--) {
      this.obstacles[i - 1].render()
    }
  }

  stop = () => {
    window.removeEventListener('keydown', this.checkPressedKey)
    clearInterval(this.gameInterval)
  }

  start = () => {
    this.setWindowListeners()
    this.levelIntervals = this.setWindowIntervals()

    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.update()
      this.render()
    }, config.gameUpdateInterval)
  }
}
