'use strict'

export class Obstacle {
  constructor ({ origin, height, width, ctx, canvas }) {
    this.origin = origin
    this.height = height
    this.width = width
    this.ctx = ctx
    this.shipPosition = null
    this.center = { x: canvas.width / 2, y: canvas.height / 2 }
  }

  update = position => {
    this.shipPosition = position
  }

  calculatePointWithPendient = () => {

  }

  computeDimension = () => {
    // Pendientes
    const m1 = Math.atan(this.center.y - this.origin.y / this.center.x - this.origin.x)
    const m2 = Math.atan(this.center.y - this.origin.y / (this.center.x + this.width) - this.origin.x)

    const base = {
      a: { x: this.origin.x, y: this.origin.y },
      b: { x: this.origin.x + this.width, y: this.origin.y },
      c: { x: this.origin.x + this.width, y: this.origin.y },

    }
  }

  render = () => {
    this.ctx.beginPath()
    this.ctx.moveTo(this.center.x + this.origin.x, this.center.y + this.origin.y)
    this.ctx.lineTo(this.center.x + this.origin.x + this.width, this.center.y + this.origin.y)
    this.ctx.moveTo(this.center.x + this.origin.x, this.center.y + this.origin.y)

    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }

}
