'use strict'

import { config, worldConfigScheme } from './config/index.mjs'
import { utils } from './utils/index.mjs'
import { OBSTACLE, CLOUD, SCALE_UNIT, KEYS } from './constants/index.mjs'
import { Ship, World } from './models/index.mjs'

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.renderInterval = null
    this.processIntervals = null
    this.score = 0
    this.timer = document.getElementById('x2043__board-score-timer')
    this.duration = 0
    this.pressedKey = null
    this.ship = null
    this.world = null
    this.position = {
      x: 0,
      y: 0
    }
    this.perspectiveOrigin = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
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
    setInterval(this.setTime, 1000)
  }

  setTime = () => {
    let minutes = parseInt(this.duration / 60, 10)
    let seconds = parseInt(this.duration % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    this.duration += 1
    this.timer.innerText = minutes + ':' + seconds
  }

  onKeyPress = () => {
    switch (this.pressedKey) {
      case KEYS.LEFT: {
        this.position = {
          ...this.position,
          x: this.position.x - config.speed.ship
        }
        break
      }

      case KEYS.RIGHT: {
        this.position = {
          ...this.position,
          x: this.position.x + config.speed.ship
        }
        break
      }

      case KEYS.UP: {
        this.position = {
          ...this.position,
          y: this.position.y + 1
        }
        break
      }

      case KEYS.DOWN: {
        this.position = {
          ...this.position,
          y: this.position.y - 1
        }
        break
      }
    }
  }

  update = () => {
    const updatedPosition = {
      ...this.position,
      y: this.position.y + 1
    }

    // this.ship.render()
    // this.world.render()
  }

  clearCanvas = () => {
    const { height, width } = this.canvas

    this.ctx.clearRect(0, 0, width, height)
  }

  render = () => {
    // this.ship.render()
    // this.world.render()
  }

  stop = () => {
    removeEventListener('keydown', this.onKeyPress)
    clearInterval(this.renderInterval)
    clearInterval(this.processIntervals)
  }

  initModels = () => {
    // this.ship = new Ship(this)
    this.world = new World({
      ...this,
      ...worldConfigScheme
    })
  }

  start = () => {
    this.setListeners()
    this.processIntervals = this.setIntervals()
    this.initModels()

    this.renderInterval = setInterval(() => {
      this.clearCanvas()
      this.update()
      this.render()
    }, config.gameFPS)
  }
}
