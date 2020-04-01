'use strict'

import { config } from '../config/index.mjs'
import { utils } from '../utils/index.mjs'

export class Cloud {
  constructor ({ length, width, ctx, canvas, d, height }) {
    this.length = length
    this.width = width
    this.height = height
    this.ctx = ctx
    this.canvas = canvas
    this.d = d
    this.lockedPoints = {}
  }

  getVanishingPoints = () => {
    return {
      o: { x: this.canvas.width / 2, y: this.canvas.height / 2 - 200 },
      f1: { x: this.canvas.width / 2 - config.viewPointHeight, y: this.canvas.height / 2 - 200 },
      f2: { x: this.canvas.width / 2 + config.viewPointHeight, y: this.canvas.height / 2 - 200 }
    }
  }

  getVertex = () => {
    const { origin, d, width, length, canvas } = this

    return {
      v1: { x: d.x, y: -d.y },
      v2: { x: d.x + width, y: -d.y },
      v3: { x: d.x + width, y: -d.y - length },
      v4: { x: d.x, y: -d.y - length },
    }
  }

  getProyectionPoints = () => {
    return {
      p1: { x: this.d.x, y: 0 },
      p2: { x: this.d.x + this.width, y: 0 },
    }
  }

  getIntersectionPoints = (intersection, pA1, pA2, pB1, pB2) => {
    if (intersection && this.lockedPoints[intersection]) {
      return this.lockedPoints[intersection]
    }

    const { x, y } = utils.getIntersectionPointsBetween2Lines(pA1, pA2, pB1, pB2)

    if (intersection && (y > this.canvas.height || y < 0)) {
      this.lockedPoints[intersection] = { x, y }
    }

    return { x, y }
  }

  getRenderPoints = () => {
    const { v1, v2, v3, v4 } = this.getVertex()
    const { f1, f2, o } = this.getVanishingPoints()
    const { p1, p2 } = this.getProyectionPoints()

    const h1 = { x: p1.x, y: p1.y + this.height - 200 }
    const h2 = { x: p2.x, y: p2.y + this.height - 200 }

    const a = this.getIntersectionPoints(null, v1, v3, { x: 0, y: 0 }, { x: 1000, y: 0 })
    const b = this.getIntersectionPoints(null, v2, v4, { x: 0, y: 0 }, { x: 1000, y: 0 })

    const i1 = this.getIntersectionPoints('i1', a, f2, p1, o)
    const i2 = this.getIntersectionPoints('i2', b, f1, p2, o)
    const i3 = this.getIntersectionPoints('i3', a, f2, p2, o)
    const i4 = this.getIntersectionPoints('i4', b, f1, p1, o)
    const i5 = this.getIntersectionPoints('i5', i1, { x: i1.x, y: 0 }, o, h1)
    const i6 = this.getIntersectionPoints('i6', i2, { x: i2.x, y: 0 }, o, h2)
    const i7 = this.getIntersectionPoints('i7', i3, { x: i3.x, y: 0 }, o, h2)
    const i8 = this.getIntersectionPoints('i8', i4, { x: i4.x, y: 0 }, o, h1)

    return {
      i1,
      i2,
      i3,
      i4,
      i5,
      i6,
      i7,
      i8
    }
  }

  update = () => {
    this.d = {
      ...this.d,
      y: this.d.y - 25
    }
  }

  move = displacement => {
    this.d = {
      ...this.d,
      x: this.d.x - (displacement / 20)
    }
  }

  render = () => {
    const { i1, i2, i3, i4, i5, i8, i6, i7 } = this.getRenderPoints()

    this.ctx.beginPath()
    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i6.x, i6.y)
    this.ctx.lineTo(i5.x, i5.y)
    this.ctx.lineTo(i1.x, i1.y)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgb(200,200,200)'
    this.ctx.fill()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 3
    // this.ctx.stroke()
    //
    if (i5.y < this.canvas.height / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i5.x, i5.y)
      this.ctx.lineTo(i6.x, i6.y)
      this.ctx.lineTo(i7.x, i7.y)
      this.ctx.lineTo(i8.x, i8.y)
      this.ctx.lineTo(i5.x, i5.y)
      this.ctx.closePath()
      this.ctx.fillStyle = 'rgb(255,255,255)'
      this.ctx.fill()
      this.ctx.strokeStyle = 'white'
      this.ctx.lineWidth = 3
      // this.ctx.stroke()
    }
    //
    if (i1.x > this.canvas.width / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i1.x, i1.y)
      this.ctx.lineTo(i4.x, i4.y)
      this.ctx.lineTo(i8.x, i8.y)
      this.ctx.lineTo(i5.x, i5.y)
      this.ctx.lineTo(i1.x, i1.y)
      this.ctx.closePath()
      this.ctx.fillStyle = 'rgb(100,100,100)'
      this.ctx.fill()
      this.ctx.strokeStyle = 'white'
      this.ctx.lineWidth = 3
      // this.ctx.stroke()
    }

    if (i2.x < this.canvas.width / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i2.x, i2.y)
      this.ctx.lineTo(i3.x, i3.y)
      this.ctx.lineTo(i7.x, i7.y)
      this.ctx.lineTo(i6.x, i6.y)
      this.ctx.lineTo(i2.x, i2.y)
      this.ctx.closePath()
      this.ctx.fillStyle = 'rgb(100,100,100)'
      this.ctx.fill()
      this.ctx.strokeStyle = 'white'
      this.ctx.lineWidth = 3
      // this.ctx.stroke()
    }
  }

}
