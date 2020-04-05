'use strict'

export class Sun {
  constructor ({ canvas, ctx, position, radius }) {
    this.canvas = canvas
    this.ctx = ctx
    this.radius = radius
    this.position = {
      x: canvas.width / 2 - 200,
      y: canvas.height / 2 - 200
    }
  }

  update = () => {

  }

  render = () => {
    const { position: { x, y }, radius } = this

    this.ctx.beginPath()
    this.ctx.arc(x, y, 4 * radius, 0, Math.PI * 2, true)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgba(255,233,201,0.05)'
    this.ctx.fill()
    this.ctx.beginPath()
    this.ctx.arc(x, y, 3 * radius, 0, Math.PI * 2, true)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgba(255,233,201,0.1)'
    this.ctx.fill()
    this.ctx.beginPath()
    this.ctx.arc(x, y, 2 * radius, 0, Math.PI * 2, true)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgba(255,233,201,0.2)'
    this.ctx.fill()
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, true)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgb(255,233,201)'
    this.ctx.fill()
  }
}
