'use strict'
import { config } from '../config/index.mjs'

export class Obstacle {
  constructor ({ origin, length, width, ctx, canvas, d, height }) {
    this.origin = origin
    this.length = length
    this.length = length
    this.width = width
    this.ctx = ctx
    this.canvas = canvas
    this.d = d
    this.height = height
  }

  getVanishingPoints = () => {
    return {
      o: { x: this.canvas.width / 2, y: this.canvas.height / 2 },
      f1: { x: this.canvas.width / 2 - config.viewPointHeight, y: this.canvas.height / 2 },
      f2: { x: this.canvas.width / 2 + config.viewPointHeight, y: this.canvas.height / 2 }
    }
  }

  getVertex = () => {
    const { origin, d, width, length, canvas } = this

    return {
      v1: { x: origin.x, y: origin.y + d + canvas.height },
      v2: { x: origin.x + width, y: origin.y + d + canvas.height },
      v3: { x: origin.x + width, y: origin.y + d + canvas.height + length },
      v4: { x: origin.x, y: origin.y + d + canvas.height + length },
    }
  }

  getProyectionPoints = () => {
    return {
      p1: { x: this.origin.x, y: this.canvas.height },
      p2: { x: this.origin.x + this.width, y: this.canvas.height },
    }
  }

  getIntersectionPoints = (pA1, pA2, pB1, pB2) => {

    // Check if none of the lines are of length 0
    if ((pA1.x === pA2.x && pA1.y === pA2.y) || (pB1.x === pB2.x && pB1.y === pB2.y)) {
      return false
    }

    const denominator = ((pB2.y - pB1.y) * (pA2.x - pA1.x) - (pB2.x - pB1.x) * (pA2.y - pA1.y))

    // Lines are parallel
    if (denominator === 0) {
      return false
    }

    let ua = ((pB2.x - pB1.x) * (pA1.y - pB1.y) - (pB2.y - pB1.y) * (pA1.x - pB1.x)) / denominator
    let ub = ((pA2.x - pA1.x) * (pA1.y - pB1.y) - (pA2.y - pA1.y) * (pA1.x - pB1.x)) / denominator

    // is the intersection along the segments
    // if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    //   return false
    // }

    // Return a object with the x and y coordinates of the intersection
    let x = pA1.x + ua * (pA2.x - pA1.x)
    let y = pA1.y + ua * (pA2.y - pA1.y)

    return { x, y }
  }

  getRenderPoints = () => {
    const { v1, v2, v3, v4 } = this.getVertex()
    const { f1, f2, o } = this.getVanishingPoints()
    const { p1, p2 } = this.getProyectionPoints()
    const h1 = { x: p1.x, y: p1.y - this.height }
    const h2 = { x: p2.x, y: p2.y - this.height }

    console.log(v1, v2, v3, v4)
    const a = this.getIntersectionPoints(v1, v3, { x: 0, y: this.canvas.height }, { x: 1000, y: this.canvas.height })
    const b = this.getIntersectionPoints(v2, v4, { x: 0, y: this.canvas.height }, { x: 1000, y: this.canvas.height })

    // Interseccion points
    const i1 = this.getIntersectionPoints(a, f2, p1, o)
    const i2 = this.getIntersectionPoints(b, f1, p2, o)
    const i3 = this.getIntersectionPoints(a, f2, p2, o)
    const i4 = this.getIntersectionPoints(b, f1, p1, o)

    const i5 = this.getIntersectionPoints(i1, { x: i1.x, y: 0 }, o, h1)
    const i6 = this.getIntersectionPoints(i2, { x: i2.x, y: 0 }, o, h2)
    const i7 = this.getIntersectionPoints(i3, { x: i3.x, y: 0 }, o, h2)
    const i8 = this.getIntersectionPoints(i4, { x: i4.x, y: 0 }, o, h1)

    return { i1, i2, i3, i4, i5, i6, i7, i8 }
  }

  update = position => {
    this.d = this.d - 1
  }

  updateOrigin = origin => {
    this.origin = origin
  }

  render = () => {
    const { i1, i2, i3, i4, i5, i8, i6, i7 } = this.getRenderPoints()

    this.ctx.beginPath()
    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i2.x, i2.y)
    this.ctx.lineTo(i3.x, i3.y)
    this.ctx.lineTo(i4.x, i4.y)
    this.ctx.lineTo(i1.x, i1.y)

    this.ctx.moveTo(i5.x, i5.y)
    this.ctx.lineTo(i6.x, i6.y)
    this.ctx.lineTo(i7.x, i7.y)
    this.ctx.lineTo(i8.x, i8.y)
    this.ctx.lineTo(i5.x, i5.y)

    this.ctx.moveTo(i1.x, i1.y)
    this.ctx.lineTo(i5.x, i5.y)

    this.ctx.moveTo(i2.x, i2.y)
    this.ctx.lineTo(i6.x, i6.y)

    this.ctx.moveTo(i3.x, i3.y)
    this.ctx.lineTo(i7.x, i7.y)

    this.ctx.moveTo(i4.x, i4.y)
    this.ctx.lineTo(i8.x, i8.y)

    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }

}
