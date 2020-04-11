'use strict'

// Models
import { Cloud, Obstacle, Sun, Road } from './index.mjs'

// Constants
import { CLOUD, OBSTACLE, KEYS } from '../constants/index.mjs'

// Config
import { config } from '../config/index.mjs'

// Utils
import { utils } from '../utils/index.mjs'

export class World {
  constructor ({
    ctx,
    canvas,
    position,
    perspectiveOrigin,
    config
  }) {
    this.ctx = ctx
    this.canvas = canvas
    this.config = config
    this.obstacles = []
    this.clouds = []
    this.board = null
    this.sun = new Sun({
      canvas,
      ctx,
      radius: 25
    })
    this.pressedKey = null
    this.position = { x: 0, y: 0 }
    this.perspectiveOrigin = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
    this.addCloudInterval = null
    this.addObstacleInterval = null
    this.sections = []
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
    // setInterval(this.onChangeSection, 10000)
  }

  onChangeSection = () => {
    const section = this.generateSection()

    if (this.sections.length < 1) {
      this.sections = [
        section,
        ...this.sections
      ]
    } else {
      this.sections = [
        section,
        ...this.sections.filter((el, i) => i),
      ]
    }
  }

  generateSection = () => {
    let obstacles = []
    const x = 100 * (Math.random() * 2 - 1)
    const y = 100 * (Math.random() * 2 - 1)

    const speed = 250
    // const newPerspectiveOrigin = {
    //   x: this.perspectiveOrigin.x + x,
    //   y: this.perspectiveOrigin.y + y,
    // }
    const newPerspectiveOrigin = this.perspectiveOrigin

    const sectionLength = speed * 500
    const sectionWidth = 5000

    const itemLength = sectionLength / 25
    const itemPosition = sectionLength / 25

    for (let i = 0; i < 50; i++) {
      obstacles.unshift(
        new Obstacle({
          ...this,
          ctx: this.ctx,
          canvas: this.canvas,
          ...utils.generateObstacle({
            index: i,
            speed
          }),
          perspectiveOrigin: newPerspectiveOrigin,
          position: {
            x: sectionWidth * (Math.random() * 2 - 1),
            y: 50000 + (itemPosition * i),
          }
        })
      )
    }

    return {
      obstacles,
      road: new Road({
        ...this,
        perspectiveOrigin: newPerspectiveOrigin,
        length: sectionLength,
        speed,
        width: sectionWidth,
        position: {
          x: -2500,
          y: 50000
        }
      })
    }
  }

  onKeyPress = () => {
    switch (this.pressedKey) {
      case KEYS.LEFT: {
        this.position = {
          ...this.position,
          x: this.position.x - 10
        }
        break
      }

      case KEYS.RIGHT: {
        this.position = {
          ...this.position,
          x: this.position.x + 10
        }
        break
      }

      case KEYS.UP: {
        break
      }

      case KEYS.DOWN: {
        break
      }
    }
  }

  onWorldChange = config => {
    this.config = config
  }

  update = () => {
    this.sections.forEach(section => {
      section.road.update(this)
      section.obstacles.forEach(obs => obs.update(this))
    })
  }

  stop = () => {
    clearInterval(this.addObstacleInterval)
    // clearInterval(this.addCloudInterval)
  }

  render = () => {
    this.sections.forEach(section => {
      section.road.render()
      section.obstacles.forEach(obs => {
        if (obs.position.y + obs.length > 0) {
          obs.render()
        }
      })
    })
  }

  start = () => {
    this.onChangeSection()
    this.setListeners()
    this.setIntervals()
  }
}
