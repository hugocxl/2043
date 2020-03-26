'use strict'

export class Spaceship {
  constructor ({ canvas, ctx, updatePosition }) {
    this.canvas = canvas
    this.ctx = ctx
    this.obstacles = []
    this.perspectiveCenter = null
    this.updatePosition = updatePosition
  }

  render = () => {
    const { height, width } = this.canvas

    this.ctx.beginPath()
    this.ctx.moveTo(width / 2, height - 200)
    this.ctx.lineTo(width / 2 + 250, height - 50)
    this.ctx.lineTo(width / 2, height - 130)
    this.ctx.lineTo(width / 2 - 250, height - 50)
    this.ctx.lineTo(width / 2, height - 200)
    this.ctx.closePath()

    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }
}
