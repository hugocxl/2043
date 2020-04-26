'use strict'

// Models
import { Cloud, Obstacle, Road } from './index.mjs'

// Constants
import { CLOUD, OBSTACLE, KEYS } from '../constants/index.mjs'

// Config
import { config } from '../config/index.mjs'

// Utils
import { utils } from '../utils/index.mjs'

const SECTION_DURATION = 1
const NUMBER_OF_SECTIONS = 50
const SECTION_LENGTH = 100

export class World {
  constructor ({
    ctx,
    canvas,
    position,
    perspectiveOrigin,
    config
  }) {
    this.speed = 10
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
    // this.sectionInterval = setInterval(this.onChangeSection, SECTION_DURATION * 1000)
  }

  generateSection = () => {
    const previousSection = this.sections[0]
    const sectionLength = 100
    const sectionWidth = this.canvas.width
    const nObstacles = 1
    const itemPositionOffset = sectionLength / nObstacles
    const xPosition = 0
    const yPosition = previousSection
      ? previousSection.position.y + previousSection.length
      : 0

    const obstacles = []

    for (let i = 0; i < 1; i++) {
      obstacles.unshift(
        new Obstacle({
          ...this,
          position: {
            x: 0,
            y: 0 + itemPositionOffset * i,
          },
          length: sectionLength,
          width: sectionWidth / 4,
          height: sectionLength * 10 * Math.random()
        })
      )
    }

    const road = new Road({
      ...this,
      length: sectionLength,
      width: sectionWidth,
      position: {
        x: 0,
        y: 0
      }
    })

    return {
      obstacles,
      road,
      length: sectionLength,
      width: sectionWidth,
      position: {
        x: xPosition,
        y: yPosition
      },
    }
  }

  onKeyPress = () => {
    switch (this.pressedKey) {
      case KEYS.LEFT: {
        this.position = {
          ...this.position,
          x: this.position.x - 5
        }
        break
      }

      case KEYS.RIGHT: {
        this.position = {
          ...this.position,
          x: this.position.x + 5
        }
        break
      }

      case KEYS.UP: {
        break
      }

      case KEYS.DOWN: {
        break
      }

      default: {
        this.position = {
          x: 0,
          y: 0
        }

      }
    }
  }

  onWorldChange = config => {
    this.config = config
  }

  update = () => {
    const sections = []

    this.sections.forEach(section => {
      if (section.position.y >= 0) {
        sections.push({
          ...section,
          position: {
            ...section.position,
            y: section.position.y - this.speed
          }
        })
      } else {
        sections.unshift(this.generateSection())
      }
    })

    this.sections = sections
  }

  render = () => {
    // this.sections.forEach(({ position, road }) => {
    //   road.render(position)
    // })

    this.sections.forEach(({ position, obstacles }) => {
      obstacles.forEach(obs => {
        obs.render(position)
      })
    })
  }

  stop = () => {
  }

  start = () => {
    for (let i = 0; i < NUMBER_OF_SECTIONS; i++) {
      this.sections.unshift(this.generateSection())
    }

    this.setListeners()
    this.setIntervals()
  }
}
