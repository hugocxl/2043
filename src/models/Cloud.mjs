'use strict'

import { config } from '../config/index.mjs'
import { utils } from '../utils/index.mjs'

export class Cloud {
  constructor ({ elevation, length, width, ctx, canvas, d, height }) {
    this.length = length
    this.width = width
    this.height = height
    this.ctx = ctx
    this.canvas = canvas
    this.d = d
    this.lockedPoints = {}
    this.elevation = elevation
  }

  getVanishingPoints = () => {
    return {
      o: { x: this.canvas.width / 2, y: this.canvas.height / 2 },
      f1: { x: this.canvas.width / 2 - config.viewPointHeight, y: this.canvas.height / 2 },
      f2: { x: this.canvas.width / 2 + config.viewPointHeight, y: this.canvas.height / 2 }
    }
  }

  getVertex = () => {
    const { d, width, length, canvas } = this

    return {
      v1: { x: d.x, y: d.y + canvas.height },
      v2: { x: d.x + width, y: d.y + canvas.height },
      v3: { x: d.x + width, y: d.y + canvas.height + length },
      v4: { x: d.x, y: d.y + canvas.height + length },
    }
  }

  getProyectionPoints = () => {
    return {
      p1: { x: this.d.x, y: this.canvas.height },
      pA: { x: this.d.x, y: this.canvas.height / 2 - 200 },
      p2: { x: this.d.x + this.width, y: this.canvas.height },
      pB: { x: this.d.x + this.width, y: this.canvas.height / 2 - 200 },
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

  getRenderPoints = () => {
    const { v1, v2, v3, v4 } = this.getVertex()
    const { f1, f2, o } = this.getVanishingPoints()
    const { p1, p2, pA, pB } = this.getProyectionPoints()

    const h1 = { x: pA.x, y: pA.y - this.elevation }
    const h2 = { x: pB.x, y: pB.y - this.elevation }
    const h3 = { x: pA.x, y: pA.y - this.height - this.elevation }
    const h4 = { x: pB.x, y: pB.y - this.height - this.elevation }

    const a = this.getIntersectionPoints(null, v1, v3, { x: 0, y: this.canvas.height }, {
      x: 1000,
      y: this.canvas.height
    })
    const b = this.getIntersectionPoints(null, v2, v4, { x: 0, y: this.canvas.height }, {
      x: 1000,
      y: this.canvas.height
    })

    const k1 = this.getIntersectionPoints('k1', a, f2, p1, o)
    const k2 = this.getIntersectionPoints('k2', b, f1, p2, o)
    const k3 = this.getIntersectionPoints('k3', a, f2, p2, o)
    const k4 = this.getIntersectionPoints('k4', b, f1, p1, o)

    const i1 = this.getIntersectionPoints('i1', k1, { x: k1.x, y: 0 }, o, h1)
    const i2 = this.getIntersectionPoints('i2', k2, { x: k2.x, y: 0 }, o, h2)
    const i3 = this.getIntersectionPoints('i3', k3, { x: k3.x, y: 0 }, o, h2)
    const i4 = this.getIntersectionPoints('i4', k4, { x: k4.x, y: 0 }, o, h1)

    const i5 = this.getIntersectionPoints('i5', i1, { x: i1.x, y: 0 }, o, h3)
    const i6 = this.getIntersectionPoints('i6', i2, { x: i2.x, y: 0 }, o, h4)
    const i7 = this.getIntersectionPoints('i7', i3, { x: i3.x, y: 0 }, o, h4)
    const i8 = this.getIntersectionPoints('i8', i4, { x: i4.x, y: 0 }, o, h3)

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
      y: this.d.y - config.speed.cloud
    }
  }

  move = displacement => {
    this.d = {
      ...this.d,
      x: this.d.x - displacement
    }
  }

  render = () => {
    const { i1, i2, i3, i4, i5, i6, i7, i8 } = this.getRenderPoints()
    // const opacity = this.d.y > 1
    //   ? (2 / this.d.y) * 1000000
    //   : 1

    const opacity = 1

    this.ctx.beginPath()
    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i3.x, i3.y)
    this.ctx.lineTo(i4.x, i4.y)
    this.ctx.lineTo(i1.x, i1.y)
    this.ctx.closePath()
    this.ctx.fillStyle = `rgb(195,148,169,${opacity})`
    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i5.x, i5.y)
    this.ctx.lineTo(i6.x, i6.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i1.x, i1.y)
    this.ctx.closePath()
    this.ctx.fillStyle = `rgb(225,195,195,${opacity})`
    this.ctx.fill()

    if (i1.x > this.canvas.width / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i1.x, i1.y)
      this.ctx.lineTo(i4.x, i4.y)
      this.ctx.lineTo(i8.x, i8.y)
      this.ctx.lineTo(i5.x, i5.y)
      this.ctx.lineTo(i1.x, i1.y)
      this.ctx.closePath()
      this.ctx.fillStyle = `rgb(255,255,255,${opacity})`
      this.ctx.fill()
    }

    if (i2.x < this.canvas.width / 2) {
      this.ctx.beginPath()
      this.ctx.moveTo(i2.x, i2.y)
      this.ctx.lineTo(i3.x, i3.y)
      this.ctx.lineTo(i7.x, i7.y)
      this.ctx.lineTo(i6.x, i6.y)
      this.ctx.lineTo(i2.x, i2.y)
      this.ctx.closePath()
      this.ctx.fillStyle = `rgb(255,255,255,${opacity})`
      this.ctx.fill()
    }
  }

}
