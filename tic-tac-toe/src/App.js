import { useState } from "react";

function Square({ value, onSquareClick, idx }) {
  return (
    <button className="square" onClick={() => onSquareClick(idx)}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares: { squares }, onPlay }) {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  };

  const winner = calculateWinner(squares);
  let status;
  status = winner
    ? "Winner: " + winner
    : "Next Player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((rowIdx) => {
        return (
          <div className="board-row" key={rowIdx}>
            {[0, 1, 2].map((colIdx) => {
              const idx = rowIdx * 3 + colIdx;
              return (
                <Square
                  key={idx}
                  value={squares[idx]}
                  onSquareClick={() => handleClick(idx)}
                  idx={idx}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), rowCol: { row: null, col: null } },
  ]);

  const [currentMove, setCurrentMove] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const currentMode = isIncreasing ? "오름차순" : "내림차순";

  const handlePlay = (nextSquares, idx) => {
    console.log(nextSquares);
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, rowCol: calculateRC(idx) },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const calculateRC = (move) => {
    const row = Math.floor(move / 3);
    const col = move % 3;
    return { row, col };
  };

  const moves = history.map((entry, move) => {
    const { row, col } = entry.rowCol;
    let description;
    description =
      move > 0
        ? `Go to move #${move} (row: ${row}, col: ${col}) `
        : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  const reverseMoves = moves.slice().reverse();

  const changeSortingMode = () => {
    setIsIncreasing((value) => !value);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={changeSortingMode}>{currentMode}</button>
        {isIncreasing ? <ul> {moves}</ul> : <ul>{reverseMoves}</ul>}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

export default Game;
