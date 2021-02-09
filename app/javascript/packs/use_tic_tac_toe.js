import { useEffect, useState } from "react"

const initialColumns = Array.from({ length: 9 }, () => null);

export default function useTicTacToe() {
  const [columns, setColumns] = useState(initialColumns)
  const [currentSign, setCurrentSign] = useState('X')

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
    setColumns(initialColumns)
  }

  useEffect(() => {
    if (columns.every(c => c)) resetGame()

    setCurrentSign(currentSign === 'X' ? 'O' : 'X')
  }, [columns])


  return {
    columns,
    onClickColumn,
    resetGame,
  };
}
