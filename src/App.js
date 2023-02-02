import React, { useState } from 'react';
import Board from './Board';

export default function Game({ boardWidth, boardHeight }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveHistory, setMoveHistory] = useState([-1]);
  const [currentMove, setCurrentMove] = useState(0);

  const nextIsX = (currentMove % 2 === 0);
  const currentSquares = history[currentMove];

  const findChanged = (nextSquares) => {
    for (let i = 0; i < currentSquares.length; i++) {
      if (currentSquares[i] != nextSquares[i]) {
        return i;
      }
    }
    return -1;
  }

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextMoveHistory = [
      ...moveHistory.slice(0, currentMove + 1),
      findChanged(nextSquares)
    ];

    setHistory(nextHistory);
    setMoveHistory(nextMoveHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (move) => {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      let moveLocation = getMoveLocationDescription(moveHistory[move], boardWidth);
      description = `move #${move} (${moveLocation})`;
    } else {
      description = 'game start';
    }

    let moveElement;

    if (move == currentMove) {
      moveElement = `You're at ${description}`;
    } else {
      moveElement = (
        <button onClick={() => jumpTo(move)}>
          Go to {description}
        </button>
      )
    }

    return (
      <li key={move}>
        {moveElement}
      </li>
    );
  });

  return (
    <div className="game">
      <div>
        <Board
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          className="game-board"
          nextIsX={nextIsX}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function getMoveLocationDescription(cell, width) {
  if (cell == -1) {
    return '';
  }
  return `${(cell % width) + 1};${(Math.floor(cell / width)) + 1}`
}
