import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import useTicTacToe from './use_tic_tac_toe'
import './tic_tac_toe.css'

const Modal = ({children}) => {
  return (
      <div className="overlay">
        <div className="modal">
          {children}
        </div>
      </div>
  )
}

const TicTacToe = ({columns, onClickColumn}) => {
  return (
    <div id="wrapper">
      <div id="tic-tac-toe">
        {
          columns.map((column, columnIndex) => (
            <div
              key={column + columnIndex}
              className="column-wrapper"
              onClick={() => onClickColumn(columnIndex)}
            >
              <span className="column">{column} {columnIndex}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const Signs = {
  X: 'X',
  O: 'O'
}

const Lobby = ({startGame, changeCurentUsersName, changeCurrentUsersSign}) => {
  return(
    <Modal>
      <div className="game-wrapper">
        <span>Username:</span>
        <input
          type="text"
          onChange={e => changeCurentUsersName(e.target.value)}
          />
        Select a sign
        <div className="signs-wrapper">
          {
            Object.values(Signs).map(sign => (
              <button key={sign} onClick={e => changeCurrentUsersSign(sign)}>
                {sign}
              </button>
            ))
          }
        </div>
        <button
          onClick={startGame}
          >
          Start to play!
        </button>
      </div>
    </Modal>
  )
}

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState({name: '', sign: ''})

  const {
    columns,
    onClickColumn,
    isGameStarted,
    setCurrentSign,
    startGame,
    setPlayers,
    players,
    addComputerAsSecondPlayer,
  } = useTicTacToe()

  const changeCurentUsersName = (name) => {
    setCurrentPlayer({...currentPlayer, name})
  }

  const changeCurrentUsersSign = (sign) => {
    setCurrentSign(sign)
    setCurrentPlayer({...currentPlayer, sign})
  }

  useEffect(() => {
    if(!currentPlayer.name || !currentPlayer.sign) return

    setPlayers([...players, currentPlayer])
    addComputerAsSecondPlayer()
  }, [currentPlayer])

  return (
    <React.Fragment>
      {!isGameStarted && (
          <Lobby
            changeCurrentUsersSign={changeCurrentUsersSign}
            changeCurentUsersName={changeCurentUsersName}
            startGame={startGame}
          />
      )}
      <TicTacToe
        columns={columns}
        onClickColumn={onClickColumn}
      />
    </React.Fragment>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Game name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
