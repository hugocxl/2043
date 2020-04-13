'use strict'

// Models
import { Ship, World } from './models/index.mjs'

// Config
import { config } from './config/index.mjs'

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
    this.timerInterval = null
    this.worldInterval = null
    this.duration = 0
    this.ship = null
    this.world = new World({
      ...this,
      config: utils.generateWorld(1),
    })

    this.worldLevel = 1
  }

  setIntervals = () => {
    this.timerInterval = setInterval(this.setTime, 1000)
    // this.worldInterval = setInterval(this.setWorld, config.levelDuration)
  }

  setTime = () => {
    let minutes = parseInt(this.duration / 60, 10)
    let seconds = parseInt(this.duration % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    this.duration += 2
    this.timer.innerText = minutes + ':' + seconds
  }

  setWorld = () => {
    // this.world.stop()
    this.worldLevel++

    setTimeout(() => {
      this.world.onWorldChange(utils.generateWorld(this.worldLevel))

      this.world.start()
    }, config.timeBetweenLevels)
  }

  setModels = () => {
    // this.ship = new Ship(this)

    // this.ship.start()
    this.world.start()
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
    // this.ship.render()
  }

  stop = () => {
    cancelAnimationFrame(this.renderInterval)
    clearInterval(this.timerInterval)
    clearInterval(this.worldInterval)
  }

  start = () => {
    this.setModels()
    this.setIntervals()

    const mainRenderProcess = () => {
      this.clearCanvas()
      this.update()
      this.render()
      requestAnimationFrame(mainRenderProcess)
    }

    this.renderInterval = requestAnimationFrame(mainRenderProcess)
  }
}
