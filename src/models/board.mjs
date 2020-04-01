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

    const grd = this.ctx.createLinearGradient(0, this.canvas.height / 2, 0, this.canvas.height)
    grd.addColorStop(0, 'rgb(120,120,120)')
    grd.addColorStop(0.3, 'rgb(200,200,200)')
    grd.addColorStop(1, 'white')

    this.ctx.fillStyle = grd
    this.ctx.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2)

    this.ctx.beginPath()
    this.ctx.moveTo(0, height / 2)
    this.ctx.lineTo(width, height / 2)
    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }
}
