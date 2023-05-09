import React from 'react'

export default function Navbar(props) {
    return (
        <div>
        <section className='side-bar'>
        <button onClick={props.handleClick}>+ New Chat</button>
        <ul className="history">
          {props.titles?.map((uniqueTitle, index) => <li key={index} onClick={() => props.toggleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Developed by Gurple</p>
        </nav>
      </section>
        </div>
    )
}