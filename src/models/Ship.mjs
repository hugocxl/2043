'use strict'

export class Ship {
  constructor ({ canvas, ctx }) {
    this.canvas = canvas
    this.ctx = ctx
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

    this.ctx.strokeStyle = 'black'
    this.ctx.xstrokeStyle = 'black'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }
}
