import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import ticTacToeChannel from "../channels/tic_tac_toe_channel"

const initialColumns = Array.from({ length: 9 }, () => null);
const findNextSign = (sign) => sign === 'X' ? 'O' : 'X'

const getUrlParams = () =>
  (new URL(window.location.href)).searchParams.get('game')
const roomId = getUrlParams() || nanoid()

export default function useTicTacToe({currentPlayer, setCurrentPlayer}) {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [columns, setColumns] = useState(initialColumns)
  const [currentSign, setCurrentSign] = useState(null)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [players, setPlayers] = useState([])
  const [gameScore, setGameScore] = useState(false)
  const [isRoomFull, setIsRoomFull] = useState(false)
  const [round, setRound] = useState({});

  const addComputerAsSecondPlayer = () => {
    setPlayers([
      ...players,
      {name: 'Computer', sign: findNextSign(currentSign)}
    ])
  }

  const updateColumns = (columnIndex) => {
    const updatedColumns = [...columns]
    updatedColumns[columnIndex] = currentSign

    return updatedColumns;
  }

  const playerJoined = (player) => {
    if (isRoomFull) return

    setPlayers([...players, player])
  }

  const finishTheGame = ({status, sign}) => {
    if (!status) return

    if (status === 'withdraw') return setGameScore('Withdraw!')

    setGameScore(`${players.find(p => p.sign == sign)?.name || ''}: ${status}`)
  }

  const setOpponentsMove = ({nextSign, updatedColumns, player}) => {
    setCurrentSign(nextSign)
    setColumns(updatedColumns)

    if (getUrlParams() && updatedColumns.filter((c) => c).length === 1)
      setCurrentPlayer({ ...currentPlayer, sign: nextSign });

    if(players.find(p => p.sign == player.sign)) return

    setPlayers([...players, player])
  }

  const restartGame = () => {
    setColumns(initialColumns)
    setGameScore(false)
  }

  const channel = ticTacToeChannel(roomId, {
    setOpponentsMove,
    finishTheGame,
    playerJoined,
    restartGame
  });

  const startGame = () => {
    channel.joinGame(currentPlayer)
    setIsGameStarted(true)
  }


  const resetGame = () => {
    channel.restartGame()
  }

  const onClickColumn = (columnIndex) => {
    if (columns[columnIndex] || currentPlayer.sign != currentSign) return;

    const updatedColumns = updateColumns(columnIndex)

    channel.userPlayed(updatedColumns, currentSign, currentPlayer)

    setColumns(updatedColumns)
  }

  const playAsSecondPlayer = () => {
    if (columns.filter(c => c).length == 9) return
    const column = Math.floor(Math.random() * 8)

    if (columns[column]) playAsSecondPlayer()

    onClickColumn(column)
  }

  useEffect(() => {
    if (!isRoomFull) return

    const playerIndex = players.findIndex(player => player.sign == currentSign)

    setCurrentPlayerIndex(playerIndex === -1 ? 1 : playerIndex)
  },[currentSign, isRoomFull])

  useEffect(() => {
    if (!isRoomFull || isGameStarted) return;

    setIsGameStarted(true);
  }, [isRoomFull, isGameStarted])

  useEffect(() => {
    if (players.length !== 2) return

    setIsRoomFull(true)
  }, [players])

  // const playAsSecondPlayer = () => {
  //   const column = Math.floor(Math.random() * 8);

  //   if (columns[column]) playAsSecondPlayer();

  //   onClickColumn(column);
  // }

  // useEffect(() => {
  //   if (currentPlayerIndex === 0) return;

  //   playAsSecondPlayer();
  // }, [currentPlayerIndex])

  return {
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
    isUsersRound: currentPlayer.sign != currentSign
  };
}
