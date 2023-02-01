import React, { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const nextIsX = (currentMove % 2 === 0);
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (move) => {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    let moveDescription;
    if (move == currentMove) {
      moveDescription = `You're at move #${currentMove}`;
    } else {
      moveDescription = (
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      )
    }

    return (
      <li key={move}>
        {moveDescription}
      </li>
    );
  });

  return (
    <div className="game">
      <div>
        <Board
          boardWidth={3}
          boardHeight={3}
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
