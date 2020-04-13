'use strict'

// Models
import { Cloud, Obstacle, Road } from './index.mjs'

// Constants
import { CLOUD, OBSTACLE, KEYS } from '../constants/index.mjs'

// Config
import { config } from '../config/index.mjs'

// Utils
import { utils } from '../utils/index.mjs'

const SECTION_DURATION = 5

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
    this.sections = []
    this.sun = {
      position: {
        x: canvas.width + 200,
        y: canvas.height - 200
      }
    }
    this.pressedKey = null
    this.position = { x: 0, y: 0 }
    this.perspectiveOrigin = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }

    this.sectionInterval = null
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
    // setInterval(this.onKeyPress, 100)
    this.sectionInterval = setInterval(this.onChangeSection, SECTION_DURATION * 1000)
  }

  onChangeSection = () => {
    const section = this.generateSection()

    if (this.sections.length < 2) {
      this.sections = [
        section,
        ...this.sections
      ]
    } else {
      this.sections.pop()

      this.sections = [
        section,
        ...this.sections
      ]
    }
  }

  generateSection = () => {
    let obstacles = []
    const x = 250 * (Math.random() * 2 - 1)
    const y = 250 * (Math.random() * 2 - 1)

    const previousSection = this.sections.length
      ? this.sections[0]
      : null

    const yPosition = previousSection
      ? previousSection.road.position.y + previousSection.road.length
      : 0

    const newPerspectiveOrigin = {
      x: this.perspectiveOrigin.x + x,
      y: this.perspectiveOrigin.y + y,
    }

    const speed = 100
    const sectionLength = speed * 60 * SECTION_DURATION
    const sectionWidth = sectionLength / 4
    const nObstacles = 50

    const itemLength = sectionLength / (nObstacles * 2)
    const itemPosition = sectionLength / nObstacles

    for (let i = 0; i < nObstacles; i++) {
      obstacles.unshift(
        new Obstacle({
          ...this,
          ...utils.generateObstacle({
            index: i,
            speed
          }),
          perspectiveOrigin: newPerspectiveOrigin,
          position: {
            x: sectionWidth * (Math.random() * 2 - 1),
            y: yPosition + itemPosition * i,
          },
          length: itemLength,
          width: itemLength
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
          x: -sectionWidth / 2,
          y: yPosition
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
    // clearInterval(this.addObstacleInterval)
    // clearInterval(this.addCloudInterval)
  }

  render = () => {
    this.sections.forEach(section => {
      // section.road.render()
      section.obstacles.forEach(obs => {
        // TODO: review margin from rendering limit
        if (obs.position.y + obs.length >= 0) {
          obs.render()
        }
      })
    })
  }

  start = () => {
    for (let i = 0; i < 2; i++) {
      this.onChangeSection()
    }
    this.setListeners()
    this.setIntervals()
  }
}
