'use strict'

export class Obstacle {
  constructor ({ coordinates, height, elevation, ctx }) {
    this.coordinates = coordinates
    this.height = height
    this.elevation = elevation
    this.ctx = ctx
    this.shipPosition = null
  }

  update = position => {
    this.shipPosition = position
  }

  render = () => {
    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(700, 200)
    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }

}
