import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <h1 className="heading">Coming Soon</h1>

        <p className="sub-text">
          Something elegant, powerful, and designed <br />
            for creators is arriving shortly.
        </p>

        <em className='info-text'>- Ashwani Verma</em>
      </div>
    </>
  )
}

export default App
