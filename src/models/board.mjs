'use strict'

import { Obstacle } from './obstacle.mjs'

export class Board {
  constructor ({ canvas, ctx }) {
    this.canvas = canvas
    this.ctx = ctx
    this.perspectiveCenter = null
    this.obstacles = null
  }

  init = () => {
    const numberOfObstacles = 1

    const obstacles = []
    for (let i = 0; i < numberOfObstacles; i++) {
      obstacles.push(
        new Obstacle({
          origin: { x: 0, y: 0 },
          d: Math.random() * this.canvas.height / 2,
          width: Math.random() * 500,
          height: Math.random() * 3000,
          length: Math.random() * 500,
          ctx: this.ctx,
          canvas: this.canvas
        })
      )
    }

    this.obstacles = obstacles
  }

  update = position => {
    this.perspectiveCenter = position

    this.obstacles = this.obstacles.map(obstacle => {
      if (obstacle.d < 0) {
        return (
          new Obstacle({
            origin: { x: 0, y: 0 },
            d: this.canvas.height / 2,
            width: Math.random() * 500,
            height: Math.random() * 3000,
            length: Math.random() * 500,
            ctx: this.ctx,
            canvas: this.canvas
          })
        )
      } else {
        obstacle.update(position)
        return obstacle
      }
    })
  }

  render = () => {
    const { height, width } = this.canvas

    this.obstacles.forEach(obstacle => {
      obstacle.render()
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
