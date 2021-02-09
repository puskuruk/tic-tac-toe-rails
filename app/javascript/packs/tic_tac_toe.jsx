import React from 'react'
import ReactDOM from 'react-dom'

const Game = () => (
  <span>Tic Tac Toe</span>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Game name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
