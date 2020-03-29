'use strict'

import { Obstacle } from './obstacle.mjs'

export class Board {
  constructor ({ canvas, ctx }) {
    this.canvas = canvas
    this.ctx = ctx
    this.perspectiveCenter = null
    this.obstacles = [
      new Obstacle({
        origin: { x: 30, y: 30 },
        width: 100,
        height: 100,
        elevation: 0,
        ctx,
        canvas
      })
    ]
  }

  update = position => {
    this.perspectiveCenter = position
  }

  render = () => {
    const { height, width } = this.canvas

    this.obstacles.map(obs => {
      obs.render()
    })

    this.ctx.beginPath()
    this.ctx.moveTo(0, height / 2)
    this.ctx.lineTo(width, height / 2)
    this.ctx.closePath()
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.arc(this.perspectiveCenter.x, this.perspectiveCenter.y, 5, 0, 360)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
