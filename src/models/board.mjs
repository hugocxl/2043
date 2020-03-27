'use strict'

import { Obstacle } from './obstacle.mjs'

export class Board {
  constructor ({ canvas, ctx }) {
    this.canvas = canvas
    this.ctx = ctx
    this.obstacles = [
      new Obstacle({
        coordinates: [],
        heigth: 100,
        elevation: 0,
        ctx
      })
    ]
    this.linePlace = 1
  }

  update = () => {
    if (this.linePlace < this.canvas.height) {
      this.linePlace += Math.pow(1.25, this.linePlace - 10)
    } else {
      this.linePlace = 1
    }
  }

  render = () => {
    const { height, width } = this.canvas

    this.obstacles.map(obs => {
      obs.render()
    })

    this.ctx.beginPath()
    this.ctx.moveTo(0, height / 2)
    this.ctx.lineTo(width, height / 2)

    //
    this.ctx.moveTo(0, this.linePlace + height / 2)
    this.ctx.lineTo(width, this.linePlace + height / 2)

    //
    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
  }
}
