'use strict'

import { config } from './config/index.mjs'
import { Board, Ship, Obstacle, Cloud } from './models/index.mjs'

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.gameInterval = null
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
    }, true)

    window.addEventListener('keyup', e => {
      this.pressedKey = null
    }, true)
  }

  setWindowIntervals = () => {
    setInterval(this.checkPressedKey, 10)
    setInterval(() => {
      const dx = Math.random() * 500000 * (Math.round(Math.random()) * 2 - 1)
      const h = Math.random() * 5000
      const l = Math.random() * 5000

      this.obstacles = [
        ...this.obstacles,
        new Obstacle({
          origin: {
            x: 0,
            y: 0
          },
          d: {
            x: dx,
            y: 10000
          },
          width: 200,
          height: Math.random() * 10000,
          length: 100,
          ctx: this.ctx,
          canvas: this.canvas
        })
      ]
    }, 10)

    setInterval(() => {
      const dx = Math.random() * 10000 * (Math.round(Math.random()) * 2 - 1)
      const h = Math.random() * 5000
      const l = Math.random() * 5000

      this.clouds = [
        ...this.clouds,
        new Cloud({
          d: {
            x: dx,
            y: 1000
          },
          width: 500,
          height: 40,
          length: 25,
          ctx: this.ctx,
          canvas: this.canvas
        })
      ]
    }, 500)
  }

  checkPressedKey = () => {
    switch (this.pressedKey) {
      case 'ArrowLeft': {
        this.displacement -= 250
        this.move(-250)
      }
        break
      case 'ArrowRight':
        this.displacement += 250
        this.move(250)
        break
    }
  }

  move = displacement => {
    this.board.move(displacement)
    this.obstacles.forEach(obs => obs.move(displacement))
    this.clouds.forEach(cloud => cloud.move(displacement))
    // this.ship.move(this.displacement)
  }

  update = () => {
    const obstacles = []
    const clouds = []
    this.board.update()

    this.clouds.forEach(cloud => {
      if (cloud.d.y + cloud.length > 0) {
        cloud.update()
        clouds.push(cloud)
      }
    })

    this.obstacles.forEach(obs => {
      if (obs.d.y + obs.length > 0) {
        obs.update()
        obstacles.push(obs)
      }
    })

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
    this.clouds.forEach(cloud => cloud.render())
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
    this.setWindowIntervals()

    this.gameInterval = setInterval(() => {
      this.clearCanvas()
      this.update()
      this.render()
    }, config.gameUpdateInterval)
  }
}
