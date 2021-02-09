import { useState } from "react";

const initialColumns = Array.from({ length: 9 }, () => null);

export default function useTicTacToe() {
  const [columns, setColumns] = useState(initialColumns)

  return {
    columns
  }
}
