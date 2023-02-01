import React, { useState } from 'react';
import Square from './Square';

export default function Board({
    boardWidth,
    boardHeight,
    nextIsX,
    squares,
    onPlay
}) {
    const winLine = calculateWinningLine(squares);
    const winner = calculateWinner(winLine, squares);
    const end = calculateEnd(squares);
    let status = getStatus(end, winner, nextIsX);

    const handleSquareClick = (i) => {
        if (winner || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();

        let value = "O";
        if (nextIsX) {
            value = "X";
        }

        nextSquares[i] = value;
        onPlay(nextSquares);
    }

    const boardSquares = Array(boardHeight);
    for (let i = 0; i < boardHeight; i++) {
        const rowSquares = Array(boardWidth);
        for (let j = 0; j < boardWidth; j++) {
            let idx = i * boardWidth + j;
            rowSquares[j] = (
                <Square
                    key={j}
                    value={squares[idx]}
                    onSquareClick={() => handleSquareClick(idx)}
                />
            );
        }
        boardSquares[i] = (<div key={i} className='board-row'>{rowSquares}</div>);
    }

    return (
        <>
            <div className='status'>{status}</div>
            {boardSquares}
        </>
    );
}

function getStatus(end, winner, nextIsX) {
    if (end) {
        return 'Draw';
    }
    if (winner) {
        return 'Winner: ' + winner;
    }

    return 'Next player: ' + (nextIsX ? 'X' : 'O');
}

function calculateEnd(squares) {
    for (let square of squares) {
        if (!square) {
            return false;
        }
    }
    return true;
}

function calculateWinningLine(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            (squares[a] === squares[b]) &&
            (squares[a] === squares[c])) {
            return i;
        }
    }
    return -1;
}

function calculateWinner(winLine, squares) {
    if (winLine == -1) {
        return null;
    }
    return squares[winLine[0]];
}

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];