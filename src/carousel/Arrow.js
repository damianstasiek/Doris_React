import React from 'react';

const Arrow = ({ direction, clickFunction, glyph }) => {
    return (
        <div
            className={`slide-arrow ${direction}`}
            onClick={clickFunction}>
            <i className={glyph}></i>
        </div>
    );
}

export default Arrow;