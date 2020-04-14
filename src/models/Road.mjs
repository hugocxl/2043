'use strict'

import { config } from '../config/index.mjs'
import { utils } from '../utils/index.mjs'
import { SCALE_UNIT } from '../constants/index.mjs'

export class Road {
  constructor ({ length, width, ctx, canvas, position, height, perspectiveOrigin, speed, color, sun }) {
    this.length = length
    this.width = width
    this.height = height
    this.ctx = ctx
    this.canvas = canvas
    this.position = position
    this.perspectiveOrigin = perspectiveOrigin
    this.sunPosition = sun.position
    this.speed = speed
    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    this.n = position.y / speed
    this.growth = {
      x: position.y > 0 ? (perspectiveOrigin.x - canvas.width / 2) / (position.y / speed) : 0,
      y: position.y > 0 ? (perspectiveOrigin.y - canvas.height / 2) / (position.y / speed) : 0,
    }
    this.calls = 0
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

  getIntersectionPoints = (pA1, pA2, pB1, pB2) => {
    const { x, y } = utils.getIntersectionPointsBetween2Lines(pA1, pA2, pB1, pB2)

    return {
      x: Math.round(x),
      y: Math.round(y)
    }
  }

  getPoints = () => {
    const { v1, v2, v3, v4 } = this.getVertex()
    const { f1, f2, o } = this.getVanishingPoints()
    const { p1, p2 } = this.getProyectionPoints()

    let i1
    let i2
    let i3
    let i4

    if (v1.y >= this.canvas.height) {
      const x1 = { x: 0, y: this.canvas.height }
      const x2 = { x: 1, y: this.canvas.height }

      const a = this.getIntersectionPoints(v1, v3, x1, x2)
      const b = this.getIntersectionPoints(v2, v4, x1, x2)

      i1 = this.getIntersectionPoints(a, f2, p1, o)
      i2 = this.getIntersectionPoints(b, f1, p2, o)
      i3 = this.getIntersectionPoints(a, f2, p2, o)
      i4 = this.getIntersectionPoints(b, f1, p1, o)
    } else {
      const tan45 = Math.tan(45 * Math.PI / 180)

      const auxV1 = {
        x: Math.round(p1.x - ((v1.y - p1.y) / tan45)),
        y: this.canvas.height
      }

      const auxV2 = {
        x: Math.round(p2.x - ((v2.y - p2.y) / tan45)),
        y: this.canvas.height,
      }

      const auxV3 = {
        x: Math.round(p2.x - ((v3.y - p2.y) / tan45)),
        y: this.canvas.height
      }

      const auxV4 = {
        x: Math.round(p1.x - ((v4.y - p1.y) / tan45)),
        y: this.canvas.height
      }

      i1 = this.getIntersectionPoints(o, p1, auxV1, f2)
      i2 = this.getIntersectionPoints(o, p2, auxV2, f2)
      i3 = this.getIntersectionPoints(o, p2, auxV3, f2)
      i4 = this.getIntersectionPoints(o, p1, auxV4, f2)
    }

    return {
      o,
      i1,
      i2,
      i3,
      i4,
    }
  }

  update = ({ position, sun }) => {
    this.sunPosition = sun.position
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
    this.ctx.closePath()
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.strokeStyle = `rgb(80,80,80,${1})`
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }
}
