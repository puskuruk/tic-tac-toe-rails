import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import ticTacToeChannel from "../channels/tic_tac_toe_channel"

const initialColumns = Array.from({ length: 9 }, () => null);
const nextSign = (sign) => sign === 'X' ? 'O' : 'X'

const getUrlParams = () =>
  (new URL(window.location.href)).searchParams.get('game')
const roomId = getUrlParams() || nanoid()

export default function useTicTacToe() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [columns, setColumns] = useState(initialColumns)
  const [currentSign, setCurrentSign] = useState('X')
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [players, setPlayers] = useState([])

  const channel = ticTacToeChannel(roomId)

  const addComputerAsSecondPlayer = () => {
    setPlayers([
      ...players,
      {name: 'Computer', sign: nextSign(currentSign)}
    ])
  }

  const startGame = () => {
    setIsGameStarted(true)
  }

  const updateColumns = (columnIndex) => {
    const updatedColumns = [...columns]
    updatedColumns[columnIndex] = currentSign

    return updatedColumns
  }

  const onClickColumn = (columnIndex) => {
    if (columns[columnIndex]) return

    const updatedColumns = updateColumns(columnIndex)

    setColumns(updatedColumns)
  }

  const resetGame = () => {
    setCurrentPlayerIndex(0);
    setColumns(initialColumns)
  }

  useEffect(() => {
    if (!isGameStarted) return

    if (columns.every(c => c)) return resetGame()

    setCurrentSign(nextSign(currentSign))
    setCurrentPlayerIndex(currentPlayerIndex === 1 ? 0 : 1)
  }, [columns, isGameStarted])

  const playAsSecondPlayer = () => {
    const column = Math.floor(Math.random() * 8);

    if (columns[column]) playAsSecondPlayer();

    onClickColumn(column);
  }

  useEffect(() => {
    if (currentPlayerIndex === 0) return;

    playAsSecondPlayer();
  }, [currentPlayerIndex])

  return {
    columns,
    onClickColumn,
    resetGame,
    isGameStarted,
    setCurrentSign,
    startGame,
    setPlayers,
    players,
    addComputerAsSecondPlayer,
  };
}
