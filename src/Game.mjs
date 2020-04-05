'use strict'

// Models
import { Ship, World } from './models/index.mjs'

// Config
import { config, worldConfigScheme } from './config/index.mjs'

// Utils
import { utils } from './utils/index.mjs'

// Constants
import { KEYS } from './constants/index.mjs'

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.renderInterval = null
    this.processIntervals = null
    this.timer = document.getElementById('x2043__board-score-timer')
    this.duration = 0
    this.ship = null
    this.world = null
  }

  setIntervals = () => {
    setInterval(this.setTime, 1000)
    setInterval(this.setLevel, config.levelDuration)
  }

  setTime = () => {
    let minutes = parseInt(this.duration / 60, 10)
    let seconds = parseInt(this.duration % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    this.duration += 1
    this.timer.innerText = minutes + ':' + seconds
  }

  update = () => {
    this.world.update(this)
  }

  clearCanvas = () => {
    const { height, width } = this.canvas

    this.ctx.clearRect(0, 0, width, height)
  }

  render = () => {
    this.world.render()
  }

  stop = () => {
    clearInterval(this.renderInterval)
    clearInterval(this.processIntervals)
  }

  setLevel = () => {
    this.world.stop()

    setTimeout(() => {
      this.world.onWorldChange(utils.generateWorld())

      this.world.start()
    }, 10000)
  }

  initModels = () => {
    this.world = new World({
      ...this,
      config: utils.generateWorld(),
    })

    this.world.start()
  }

  start = () => {
    this.initModels()
    this.processIntervals = this.setIntervals()

    const test = () => {
      this.clearCanvas()
      this.update()
      this.render()
      window.requestAnimationFrame(test)
    }

    this.renderInterval = requestAnimationFrame(test)
  }
}
