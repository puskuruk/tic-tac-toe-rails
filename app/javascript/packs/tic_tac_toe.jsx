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


const TicTacToe = ({columns, onClickColumn, userPlayingText, isUsersRound}) => {
  return (
    <div id="wrapper">
      <span>
        {userPlayingText && userPlayingText}
      </span>
      <div id="tic-tac-toe">
        {
          columns.map((column, columnIndex) => (
            <div
            key={column + columnIndex}
            className={`column-wrapper ${isUsersRound && 'disabled-column'}`}
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

const ScoreBoard = ({gameScore, resetGame}) => {
  return (
    <Modal>
      <div>
        {gameScore || ''}
        <br />
        <button onClick={resetGame}>Play Again</button>
      </div>
    </Modal>
  )
}

const Signs = {
  X: 'X',
  O: 'O'
}

const Lobby = ({startGame, changeCurentUsersName, changeCurrentUsersSign, isGuest}) => {
  return(
    <Modal>
      <div className="game-wrapper">
        <span>Username:</span>
        <br />
        <input
          type="text"
          onChange={e => changeCurentUsersName(e.target.value)}
        />
        <br />
        {!isGuest && (
          <React.Fragment>
            <span>Select a sign</span>
            <br />
            <div className="signs-wrapper">
              {
                Object.values(Signs).map(sign => (
                  <button key={sign} onClick={e => changeCurrentUsersSign(sign)}>
                    {sign}
                  </button>
                ))
              }
            </div>
          </React.Fragment>
        )}
        <br />
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
    currentPlayerIndex,
    onClickColumn,
    gameScore,
    resetGame,
    isGameStarted,
    startGame,
    roomId,
    players,
    setCurrentSign,
    getUrlParams,
    isRoomFull,
    isUsersRound,
  } = useTicTacToe({currentPlayer, setCurrentPlayer})

  const changeCurentUsersName = (name) => {
    setCurrentPlayer({...currentPlayer, name})
  }

  const changeCurrentUsersSign = (sign) => {
    setCurrentSign(sign)
    setCurrentPlayer({...currentPlayer, sign})
  }

  return (
    <React.Fragment>
      {!isGameStarted && (
          <Lobby
            changeCurrentUsersSign={changeCurrentUsersSign}
            changeCurentUsersName={changeCurentUsersName}
            startGame={startGame}
            isGuest={getUrlParams()}
          />
      )}
      {gameScore && <ScoreBoard gameScore={gameScore} resetGame={resetGame} /> }
      {isGameStarted && !isRoomFull && !getUrlParams() && <input type="readonly" value={`${window.location.href}?game=${roomId}`} />}
      <TicTacToe
        columns={columns}
        onClickColumn={onClickColumn}
        currentPlayer={currentPlayer}
        currentPlayerIndex={currentPlayerIndex}
        userPlayingText={
          isRoomFull && `${players[currentPlayerIndex]?.name} is playing`
        }
        isUsersRound={isUsersRound}
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
