'use strict'

// import { CLOUD, OBSTACLE } from '../constants/index'
// import { config } from '../config/index'
// import { Obstacle } from './Obstacle'
// import { utils } from '../utils/index'
// import { Cloud } from './Cloud'

export class World {
  // constructor () {}
  //
  // setIntervals = () => {
  //   setInterval(this.checkPressedKey, 10)
  //   setInterval(() => this.addItem(OBSTACLE), config.addItemTimeout.obstacle)
  //   setInterval(() => this.addItem(CLOUD), config.addItemTimeout.cloud)
  // }
  //
  // addItem = item => {
  //   switch (item) {
  //     case OBSTACLE: {
  //       this.obstacles = [
  //         ...this.obstacles,
  //         new Obstacle({
  //           ctx: this.ctx,
  //           canvas: this.canvas,
  //           ...utils.generateObstacle(this.displacement)
  //         })
  //       ]
  //       break
  //     }
  //
  //     case CLOUD : {
  //       if (this.clouds.length < 20) {
  //         this.clouds = [
  //           ...this.clouds,
  //           new Cloud({
  //             ctx: this.ctx,
  //             canvas: this.canvas,
  //             ...utils.generateCloud()
  //           })
  //         ]
  //         break
  //       }
  //     }
  //
  //     default: {
  //       throw new Error('ITEM TYPE NOT SPECIFIED')
  //     }
  //   }
  // }
  //
  //
  // move = displacement => {
  //   this.board.move(displacement)
  //
  //   const length = this.obstacles.length > this.clouds.length
  //     ? this.obstacles.length
  //     : this.clouds.length
  //
  //   for (let i = 0; i < length; i++) {
  //     if (this.obstacles[i]) {
  //       this.obstacles[i].move(displacement)
  //     }
  //
  //     if (this.clouds[i]) {
  //       this.clouds[i].move(displacement)
  //     }
  //   }
  // }
  //
  // update = () => {
  //   const obstacles = []
  //   const clouds = []
  //   this.board.update()
  //
  //   const length = this.obstacles.length > this.clouds.length
  //     ? this.obstacles.length
  //     : this.clouds.length
  //
  //   for (let i = 0; i < length; i++) {
  //     if (this.obstacles[i] && this.obstacles[i].d.y + this.obstacles[i].length > 0) {
  //       // this.obstacles[i].update(this.displacement / 50)
  //       this.obstacles[i].update(0)
  //       obstacles.push(this.obstacles[i])
  //     }
  //
  //     if (this.clouds[i] && this.clouds[i].d.y + this.clouds[i].length > 0) {
  //       this.clouds[i].update()
  //       clouds.push(this.clouds[i])
  //     }
  //   }
  //
  //   this.obstacles = obstacles
  //   this.clouds = clouds
  // }
  //
  // render = () => {}

}
