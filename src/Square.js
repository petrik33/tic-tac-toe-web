import React from 'react';
import { useState } from "react";

export default function Square({ value, winning, onSquareClick }) {

    const handleClick = () => {
        onSquareClick();
    }

    let classes = 'square';
    if (winning) {
        classes += ' winning';
    }

    return (
        <button
            className={classes}
            onClick={handleClick}
        >
            {value}
        </button>
    );
}