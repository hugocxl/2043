'use strict'

import { config } from '../config/index.mjs'
import { utils } from '../utils/index.mjs'
import { SCALE_UNIT } from '../constants/index.mjs'

export class Obstacle {
  constructor ({ length, width, ctx, canvas, position, height, perspectiveOrigin, speed, color, sun }) {
    this.length = length
    this.width = width
    this.height = height
    this.ctx = ctx
    this.canvas = canvas
    this.position = position
    this.lockedPoints = {}
    this.perspectiveOrigin = perspectiveOrigin
    this.sunPosition = sun.position
    this.speed = speed
    this.color = [
      150,
      150,
      150
    ]
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
    if (intersection && this.lockedPoints[intersection]) {
      return this.lockedPoints[intersection]
    }

    const { x, y } = utils.getIntersectionPointsBetween2Lines(pA1, pA2, pB1, pB2)

    if (intersection && y > this.canvas.height) {
      this.lockedPoints[intersection] = { x, y }
    }

    return { x, y }
  }

  get3Dpoints = () => {
    const { v1, v2, v3, v4 } = this.getVertex()
    const { f1, f2, o } = this.getVanishingPoints()
    const { p1, p2 } = this.getProyectionPoints()
    const sunProyection = {
      ...this.sunPosition,
      y: this.canvas.height / 2
    }

    const h1 = { x: p1.x, y: p1.y - this.height }
    const h2 = { x: p2.x, y: p2.y - this.height }

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
    const i5 = this.getIntersectionPoints('i5', i1, { x: i1.x, y: 0 }, o, h1)
    const i6 = this.getIntersectionPoints('i6', i2, { x: i2.x, y: 0 }, o, h2)
    const i7 = this.getIntersectionPoints('i7', i3, { x: i3.x, y: 0 }, o, h2)
    const i8 = this.getIntersectionPoints('i8', i4, { x: i4.x, y: 0 }, o, h1)

    const s1 = this.getIntersectionPoints('s1', i2, sunProyection, i6, this.sunPosition)
    const s2 = this.getIntersectionPoints('s2', i1, sunProyection, i5, this.sunPosition)
    const s3 = this.getIntersectionPoints('s3', i4, sunProyection, i8, this.sunPosition)

    return {
      o,
      i1,
      i2,
      i3,
      i4,
      i5,
      i6,
      i7,
      i8,
      s1,
      s2,
      s3
    }
  }

  update = ({ perspectiveOrigin, position, sun }) => {
    this.sunPosition = sun.position
    this.perspectiveOrigin = perspectiveOrigin
    this.position = {
      x: this.position.x - position.x,
      y: this.position.y - this.speed - position.y
    }
  }

  renderBaseLine = ({ o, i1, i2, i3, i4, i5, i8, i6, i7, s1, s2, s3 }) => {
    if (this.position.y > 1) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, i1.y)
      this.ctx.lineTo(this.canvas.width, i1.y)
      this.ctx.closePath()
      this.ctx.strokeStyle = `rgba(50,50,50,${0.25})`
      this.ctx.lineWidth = 1
      this.ctx.stroke()
    }
  }

  renderShadow = ({ o, i1, i2, i3, i4, i5, i8, i6, i7, s1, s2, s3 }) => {
    this.ctx.beginPath()
    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(s1.x, s1.y)
    this.ctx.lineTo(s2.x, s2.y)
    this.ctx.lineTo(s3.x, s3.y)
    this.ctx.lineTo(i4.x, i4.y)
    this.ctx.lineTo(i1.x, i1.y)
    this.ctx.closePath()
    this.ctx.fillStyle = `rgb(0, 0, 0, 0.1)`
    this.ctx.fill()
  }

  renderFaces = ({ o, i1, i2, i3, i4, i5, i8, i6, i7, s1, s2, s3 }) => {
    this.ctx.beginPath()
    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i6.x, i6.y)
    this.ctx.lineTo(i5.x, i5.y)
    this.ctx.lineTo(i1.x, i1.y)
    this.ctx.closePath()
    this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]},${1})`
    this.ctx.fill()
    this.ctx.strokeStyle = `rgb(80,80,80,${1})`
    this.ctx.lineWidth = 1
    this.ctx.stroke()

    if (i5.y > this.canvas.height / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i5.x, i5.y)
      this.ctx.lineTo(i6.x, i6.y)
      this.ctx.lineTo(i7.x, i7.y)
      this.ctx.lineTo(i8.x, i8.y)
      this.ctx.lineTo(i5.x, i5.y)
      this.ctx.closePath()
      this.ctx.fillStyle = `rgb(${this.color[0] + 50},${this.color[1] + 50},${this.color[2] + 50},${1})`
      this.ctx.fill()
      this.ctx.strokeStyle = `rgb(80,80,80,${1})`
      this.ctx.lineWidth = 1
      this.ctx.stroke()
    }

    if (i1.x > this.canvas.width / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i1.x, i1.y)
      this.ctx.lineTo(i4.x, i4.y)
      this.ctx.lineTo(i8.x, i8.y)
      this.ctx.lineTo(i5.x, i5.y)
      this.ctx.lineTo(i1.x, i1.y)
      this.ctx.closePath()
      this.ctx.fillStyle = `rgb(${this.color[0] + 50},${this.color[1] + 50},${this.color[2] + 50},${1})`
      this.ctx.fill()
      this.ctx.strokeStyle = `rgb(80,80,80,${1})`
      this.ctx.lineWidth = 1
      this.ctx.stroke()
    }

    if (i2.x < this.canvas.width / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i2.x, i2.y)
      this.ctx.lineTo(i3.x, i3.y)
      this.ctx.lineTo(i7.x, i7.y)
      this.ctx.lineTo(i6.x, i6.y)
      this.ctx.lineTo(i2.x, i2.y)
      this.ctx.closePath()
      this.ctx.fillStyle = `rgb(${this.color[0] + 100},${this.color[1] + 100},${this.color[2] + 100},${1})`
      this.ctx.fill()
      this.ctx.strokeStyle = `rgb(80,80,80,${1})`
      this.ctx.lineWidth = 1
      this.ctx.stroke()
    }
  }

  render = () => {
    const points = this.get3Dpoints()

    this.renderBaseLine(points)
    this.renderShadow(points)
    this.renderFaces(points)
  }

}
