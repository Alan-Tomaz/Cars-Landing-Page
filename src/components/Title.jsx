import React from 'react'
import './Title.css';

function Title({ title }) {
    return (
        <div className='title'>
            <h1 className='page__title'>{title}</h1>
            <hr className='page__row' />
        </div>
    )
}

export default Title
