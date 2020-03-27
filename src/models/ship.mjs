'use strict'

export class Ship {
  constructor ({ canvas, ctx, updatePosition }) {
    this.canvas = canvas
    this.ctx = ctx
    this.obstacles = []
    this.perspectiveCenter = null
    this.position = { x: 0, y: 0 }
  }

  update = position => {
    this.position = {
      ...position,
      y: this.canvas.height
    }
  }

  render = () => {
    const { height, width } = this.canvas
    const { x, y } = this.position

    this.ctx.beginPath()
    this.ctx.moveTo(width / 2 - x, height - 200)
    this.ctx.lineTo(width / 2 + 250 - x, height - 50)
    this.ctx.lineTo(width / 2 - x, height - 130)
    this.ctx.lineTo(width / 2 - 250 - x, height - 50)
    this.ctx.lineTo(width / 2 - x, height - 200)
    this.ctx.closePath()

    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }
}
