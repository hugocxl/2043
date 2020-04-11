'use strict'

import { config } from '../config/index.mjs'
import { utils } from '../utils/index.mjs'

export class Road {
  constructor ({ length, width, ctx, canvas, speed, perspectiveOrigin, position }) {
    this.length = length
    this.width = width
    this.ctx = ctx
    this.canvas = canvas
    this.position = position
    this.lockedPoints = {}
    this.perspectiveOrigin = perspectiveOrigin
    this.speed = speed
    this.growth = {
      x: (perspectiveOrigin.x - canvas.width / 2) / (position.y / speed),
      y: (perspectiveOrigin.y - canvas.height / 2) / (position.y / speed),
    }
  }

  getVanishingPoints = () => {
    return {
      o: this.perspectiveOrigin,
      f1: {
        ...this.perspectiveOrigin,
        x: this.perspectiveOrigin.x - config.viewPointHeight
      },
      f2: {
        ...this.perspectiveOrigin,
        x: this.perspectiveOrigin.x + config.viewPointHeight
      },
    }
  }

  getVertex = () => {
    const { position, width, length, canvas } = this

    return {
      v1: { x: position.x, y: position.y + canvas.height },
      v2: { x: position.x + width, y: position.y + canvas.height },
      v3: { x: position.x + width, y: position.y + canvas.height + length },
      v4: { x: position.x, y: position.y + canvas.height + length },
    }
  }

  getProyectionPoints = () => {
    return {
      p1: { x: this.position.x, y: this.canvas.height },
      p2: { x: this.position.x + this.width, y: this.canvas.height },
    }
  }

  getIntersectionPoints = (intersection, pA1, pA2, pB1, pB2) => {
    // if (intersection && this.lockedPoints[intersection]) {
    //   return this.lockedPoints[intersection]
    // }

    const { x, y } = utils.getIntersectionPointsBetween2Lines(pA1, pA2, pB1, pB2)

    // if (intersection && y > this.canvas.height) {
    //   this.lockedPoints[intersection] = { x, y }
    // }

    return { x, y }
  }

  getPoints = () => {
    const { v1, v2, v3, v4 } = this.getVertex()
    const { f1, f2, o } = this.getVanishingPoints()
    const { p1, p2 } = this.getProyectionPoints()

    const a = this.getIntersectionPoints(
      null,
      v1,
      v3,
      { x: 0, y: this.canvas.height },
      { x: 800, y: this.canvas.height }
    )
    const b = this.getIntersectionPoints(
      null,
      v2,
      v4,
      { x: 0, y: this.canvas.height },
      { x: 800, y: this.canvas.height }
    )

    const i1 = this.getIntersectionPoints('i1', a, f2, p1, o)
    const i2 = this.getIntersectionPoints('i2', b, f1, p2, o)
    const i3 = this.getIntersectionPoints('i3', a, f2, p2, o)
    const i4 = this.getIntersectionPoints('i4', b, f1, p1, o)

    return {
      o,
      i1,
      i2,
      i3,
      i4,
    }
  }

  update = ({ perspectiveOrigin, position, sun }) => {
    // this.sunPosition = sun.position
    this.perspectiveOrigin = {
      x: this.perspectiveOrigin.x - this.growth.x,
      y: this.perspectiveOrigin.y - this.growth.y,
    }

    this.position = {
      x: this.position.x - position.x,
      y: this.position.y - this.speed - position.y
    }
  }

  render = () => {
    const { i1, i2, i3, i4 } = this.getPoints()

    this.ctx.beginPath()
    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i3.x, i3.y)
    this.ctx.lineTo(i4.x, i4.y)
    this.ctx.lineTo(i1.x, i1.y)
    this.ctx.closePath()
    this.ctx.fillStyle = 'red'
    this.ctx.fill()
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }

}
