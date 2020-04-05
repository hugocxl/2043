'use strict'

import { Game } from './Game.mjs'

window.onload = function () {
  const canvas = document.getElementById('x2043__board-main')
  const ctx = canvas.getContext('2d')

  function setCanvasDimensions () {
    const { innerWidth, innerHeight } = window

    canvas.width = innerWidth
    canvas.height = innerHeight
  }

  function setCanvasTranslation () {
    const x = Math.round(Math.random()) * 2 - 1
    const y = Math.round(Math.random()) * 2 - 1

    canvas.style.transform = `translate(${x}px, ${y}px)`
  }

  function setIntervals () {
    // window.setInterval(setCanvasTranslation, 50)
  }

  function setListeners () {
    window.addEventListener('resize', setCanvasDimensions)
  }

  setCanvasDimensions()
  setListeners()
  setIntervals()

  const game = new Game({
    canvas,
    ctx,
  })

  game.start()
}
