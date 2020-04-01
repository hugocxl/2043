'use strict'

export class Board {
  constructor ({ canvas, ctx }) {
    this.canvas = canvas
    this.ctx = ctx
    this.displacement = 0
  }

  move = displacement => {
    this.displacement = displacement
  }

  update = () => {
  }

  render = () => {
    const { height, width } = this.canvas
    this.ctx.beginPath()
    this.ctx.moveTo(0, height / 2)
    this.ctx.lineTo(width, height / 2)
    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }
}
