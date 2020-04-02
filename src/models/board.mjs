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
    const grd = this.ctx.createLinearGradient(0, this.canvas.height / 2, 0, this.canvas.height)
    grd.addColorStop(0, 'rgb(120,120,120)')
    grd.addColorStop(0.3, 'rgb(200,200,200)')
    grd.addColorStop(1, 'white')
    this.ctx.fillStyle = grd
    this.ctx.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2)
    this.ctx.closePath()

    this.ctx.beginPath()
    const grd2 = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height / 2)
    grd2.addColorStop(0, 'rgba(49,27,27,1)')
    grd2.addColorStop(0.2, 'rgba(76,40,34,1)')
    grd2.addColorStop(0.4, 'rgba(128,60,44,1)')
    grd2.addColorStop(0.75, 'rgba(235,115,68,1)')
    grd2.addColorStop(1, 'rgba(245,195,85,1)')
    this.ctx.fillStyle = grd2
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height / 2)
    this.ctx.closePath()

    this.ctx.beginPath()
    this.ctx.moveTo(0, height / 2)
    this.ctx.lineTo(width, height / 2)
    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.arc(this.canvas.width / 2 + 300, this.canvas.height / 2 - 200, 75, 0, Math.PI * 2, true)
    this.ctx.closePath()
    // this.ctx.shadowBlur = 0
    // this.ctx.shadowOffsetY = 1
    // this.ctx.shadowColor = 'rgb(255,0,8)'
    this.ctx.fillStyle = 'red'
    this.ctx.fill()
  }
}
