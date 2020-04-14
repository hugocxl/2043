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

  onChangeSection = () => {
    const section = this.generateSection()

    if (this.sections.length < 3) {
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
    const x = 1 * (Math.random() * 2 - 1)
    const y = 1 * (Math.random() * 2 - 1)

    const previousSection = this.sections.length
      ? this.sections[0]
      : null

    const yPosition = previousSection
      ? previousSection.road.position.y + previousSection.road.length
      : 0

    const newPerspectiveOrigin = {
      x: Math.round(this.perspectiveOrigin.x + x),
      y: Math.round(this.perspectiveOrigin.y + y),
    }
    //
    // const newPerspectiveOrigin = this.perspectiveOrigin
    //
    const speed = 50
    const sectionLength = speed * 60 * SECTION_DURATION
    const sectionWidth = sectionLength / 10
    const nObstacles = speed / 10

    const itemLength = sectionLength / (nObstacles * nObstacles)
    const itemPosition = sectionLength / nObstacles

    this.perspectiveOrigin = newPerspectiveOrigin

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
          length: 200,
          width: 200,
          height: 200
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
          x: 0,
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
      if (section.road.position.y + section.road.length >= 0) {
        section.road.update(this)
        section.obstacles.forEach(obs => obs.update(this))
        sections.push(section)
      } else {
        sections.unshift(this.generateSection())
      }
    })

    this.sections = sections
  }

  render = () => {
    this.sections.forEach(section => {
      section.road.render()
    })

    this.sections.forEach(section => {
      section.obstacles.forEach(obs => {
        if (obs.position.y + obs.length >= 0) {
          obs.render()
        }
      })
    })
  }

  stop = () => {
  }

  start = () => {
    for (let i = 0; i < 1; i++) {
      this.onChangeSection()
    }
    this.setListeners()
    this.setIntervals()
  }
}
