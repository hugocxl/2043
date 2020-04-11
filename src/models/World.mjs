'use strict'

// Models
import { Cloud, Obstacle, Sun } from './index.mjs'

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
      y: canvas.height / 2 + 20
    }
    this.addCloudInterval = null
    this.addObstacleInterval = null
    this.higherViewPoint = null
  }

  setListeners = () => {
    addEventListener('keydown', ({ key }) => {
      this.pressedKey = key
    }, true)

    addEventListener('keyup', () => {
      this.pressedKey = null
      this.position = { x: 0, y: 0 }
      this.perspectiveOrigin = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      }
    }, true)
  }

  setIntervals = () => {
    setInterval(this.onKeyPress, 10)
    setInterval(this.modifyViewPoint, 50)

    this.addCloudInterval = setInterval(() => {
      if (this.obstacles.length < this.config.obstacle.limit) {
        this.addItem(OBSTACLE)
      }
    }, this.config.obstacle.interval)

    this.addObstacleInterval = setInterval(() => {
      if (this.clouds.length < this.config.cloud.limit) {
        this.addItem(CLOUD)
      }
    }, this.config.cloud.interval)
  }

  modifyViewPoint = () => {
    const x = 25 * (Math.random() * 2 - 1)
    // const x = 0
    const y = 50 * (Math.random() * 2 - 1)
    this.perspectiveOrigin = {
      x: this.perspectiveOrigin.x + x,
      y: this.perspectiveOrigin.y + y,
    }
  }

  onKeyPress = () => {
    switch (this.pressedKey) {
      case KEYS.LEFT: {
        // this.position = {
        //   ...this.position,
        //   x: this.position.x - 1
        // }
        this.perspectiveOrigin = {
          ...this.perspectiveOrigin,
          x: this.perspectiveOrigin.x - 0.25
        }
        break
      }

      case KEYS.RIGHT: {
        // this.position = {
        //   ...this.position,
        //   x: this.position.x + 1
        // }
        this.perspectiveOrigin = {
          ...this.perspectiveOrigin,
          x: this.perspectiveOrigin.x + 0.25
        }
        break
      }

      case KEYS.UP: {
        // this.position = {
        //   ...this.position,
        //   y: this.position.y + 1
        // }
        this.perspectiveOrigin = {
          ...this.perspectiveOrigin,
          y: this.perspectiveOrigin.y + 0.25
        }
        break
      }

      case KEYS.DOWN: {
        // this.position = {
        //   ...this.position,
        //   y: this.position.y - 1
        // }
        this.perspectiveOrigin = {
          ...this.perspectiveOrigin,
          y: this.perspectiveOrigin.y - 0.25
        }
        break
      }
    }
  }

  addItem = type => {
    switch (type) {
      case OBSTACLE: {
        this.obstacles = [
          new Obstacle({
            ...this,
            ctx: this.ctx,
            canvas: this.canvas,
            ...utils.generateObstacle(this.config.obstacle),
          }),
          ...this.obstacles
        ]
        break
      }

      case CLOUD : {
        this.clouds = [
          new Cloud({
            ...this,
            ctx: this.ctx,
            canvas: this.canvas,
            ...utils.generateCloud(this.config.cloud),
          }),
          ...this.clouds
        ]
        break
      }

      default: {
        throw new Error('ITEM TYPE NOT SPECIFIED')
      }
    }
  }

  onWorldChange = config => {
    this.config = config
  }

  update = () => {
    const obstacles = []
    const clouds = []

    const length = this.obstacles.length > this.clouds.length
      ? this.obstacles.length
      : this.clouds.length

    for (let i = 0; i < length; i++) {
      if (this.clouds[i] && (this.clouds[i].position.y > 0)) {
        this.clouds[i].update(this)
        clouds.push(this.clouds[i])
      }

      if (this.obstacles[i] && (this.obstacles[i].position.y > 0)) {
        this.obstacles[i].update(this)
        obstacles.push(this.obstacles[i])
      }
    }

    this.obstacles = obstacles
    this.clouds = clouds
  }

  stop = () => {
    clearInterval(this.addObstacleInterval)
    clearInterval(this.addCloudInterval)
  }

  render = () => {
    // this.sun.render()
    // this.clouds.forEach(cloud => cloud.render())
    let higherViewPoint = null
    this.obstacles.forEach((obstacle, i) => {
      if (!higherViewPoint) {
        higherViewPoint = obstacle.perspectiveOrigin.y
      }

      if (obstacle.perspectiveOrigin.y + 50 >= higherViewPoint) {
        higherViewPoint = obstacle.perspectiveOrigin.y
        obstacle.render({ base: true })
        obstacle.renderBaseLine()
      }
    })
  }

  start = () => {
    this.setListeners()
    this.setIntervals()
  }
}
