'use strict'

import { Game } from './game.mjs'

window.onload = function () {
  const canvas = document.getElementById('board')
  const ctx = canvas.getContext('2d')

  setCanvasDimensions()
  // setGameListeners()

  const game = new Game({
    canvas,
    ctx,
  })

  game.start()

  function setCanvasDimensions () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  // function setGameListeners () {
  //   // Listener to adapt canvas size to the window size
  //   window.addEventListener('resize', setCanvasDimensions)
  //
  //   document.getElementById('button-start').addEventListener('click', ev => {
  //     document.getElementById('modal-start').classList.toggle('hidden')
  //     document.getElementById('modal-container').classList.toggle('hidden')
  //     ev.stopPropagation()
  //     game.start()
  //   })
  // }
}
