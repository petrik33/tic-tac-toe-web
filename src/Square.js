import React from 'react';
import { useState } from "react";

export default function Square({ value, onSquareClick }) {

    const handleClick = () => {
        onSquareClick();
    }

    return (
        <button
            className="square"
            onClick={handleClick}
        >
            {value}
        </button>
    );
}