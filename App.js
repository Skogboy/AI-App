import { useState, useEffect } from 'react'
import Navbar from './Navbar'
const fetch = require('node-fetch')

const App = () => {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)
  const [loading, setLoading] = useState(false);

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle) 
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  // console.log(uniqueTitles)

  const createNewChat = () => {
    setMessage(null) 
    setValue('')
    setCurrentTitle(null)
  }

  const toggleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null) 
    setValue('')
  }

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify ({
        message: value
      }),
      headers: {
      'Content-Type': 'application/json'
      } 

    }



    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      // console.log(data)
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    // console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats, 
          {
          title: currentTitle,
          role: 'user',
          content: value
        }, 
        {
          title: currentTitle,
          role: message.role,
          content: message.content
        }
      ]
      ))
    }
  }, [message, currentTitle])

  // console.log(previousChats)



  return (
    <div className="App">
      <Navbar handleClick={createNewChat} toggleClick={toggleClick} titles={uniqueTitles} />
      <section className="main">
        <h1>GurpleGPT</h1>
        <ul className="feed">
          {currentChat.map((chatMessage, index) => <li key={index}>
            <p className='role'>{chatMessage.role}</p>
            <p className='role'>{chatMessage.content}</p>
          </li>)}

        </ul>
        <div className="bottom-section">
          <div className="input-container">
              <input value={value} onChange={(e) => setValue(e.target.value)} />
              <div id="submit" onClick={getMessages}>
                submit
              </div>
            <p className="info">
              Welcome to GurpleGPT, your new personal AI assistant
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default App;
