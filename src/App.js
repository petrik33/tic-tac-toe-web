import React, { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [nextIsX, setNextIsX] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquares = history[history.length - 1];

  const handlePlay = (nextSquares) => {
    setHistory([...history, nextSquares]);
    setNextIsX(!nextIsX);
  }

  return (
    <div className="game">
      <div>
        <Board
          className="game-board"
          nextIsX={nextIsX}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}
