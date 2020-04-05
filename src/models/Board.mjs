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
    const grd2 = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height / 2)
    grd2.addColorStop(0, 'rgb(232,183,137)')
    grd2.addColorStop(0.2, 'rgb(230,215,169)')
    grd2.addColorStop(0.4, 'rgb(225,192,192)')
    grd2.addColorStop(0.8, 'rgb(195,148,169)')
    grd2.addColorStop(1, 'rgb(191,117,116)')
    // grd2.addColorStop(1, 'rgb(179,136,97)')
    this.ctx.fillStyle = grd2
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height / 2)
    this.ctx.closePath()

    this.ctx.beginPath()
    const grd = this.ctx.createLinearGradient(0, this.canvas.height / 2, 0, this.canvas.height)
    grd.addColorStop(0, 'rgb(139,123,104)')
    grd.addColorStop(0.3, 'rgb(199,180,153)')
    grd.addColorStop(1, 'rgb(255,233,201)')
    this.ctx.fillStyle = grd
    this.ctx.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2)
    this.ctx.closePath()

  }
}
