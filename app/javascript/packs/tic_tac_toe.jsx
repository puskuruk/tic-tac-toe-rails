import React from 'react'
import ReactDOM from 'react-dom'
import useTicTacToe from './use_tic_tac_toe'
import './tic_tac_toe.css'

const Game = () => {
  const {columns} = useTicTacToe()

  return (
    <div id="wrapper">
      <div id="tic-tac-toe">
        {
          columns.map((column, columnIndex) => (
            <div
              key={column + columnIndex}
              className="column-wrapper"
            >
              <span className="column">{column} {columnIndex}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Game name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
