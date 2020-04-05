'use strict'

import { Game } from './game.mjs'

window.onload = function () {
  const canvas = document.getElementById('x2043__board')
  const ctx = canvas.getContext('2d')

  function setCanvasDimensions () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function moveCanvas () {
    canvas.style.transform = `translate(${Math.round(Math.random()) * 2 - 1}px, ${Math.round(Math.random()) * 2 - 1}px)`
  }

  function setIntervals () {
    window.setInterval(moveCanvas, 50)
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
