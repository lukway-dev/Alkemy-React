import React, { useState, useEffect } from 'react'

const Context = React.createContext({})

// eslint-disable-next-line react/prop-types
export function ContextProvider ({ children }) {
  const [contextData, setContextData] = useState({
    token: '',
    heroes: [],
    alignment: {
      good: 0,
      bad: 0
    }
  })

  // Check Local Storage
  useEffect(()=> {
    let token = localStorage.getItem('token')
    let heroes = JSON.parse(localStorage.getItem('heroes'))
    let alignment = JSON.parse(localStorage.getItem('alignment'))

    if(token){
      setContextData({
        token,
        heroes,
        alignment
      })
    }
  }, [])

  // Save heroes data
  useEffect(() => {
    const heroes = contextData.heroes
    const alignment = contextData.alignment

    localStorage.setItem('heroes', JSON.stringify(heroes))
    localStorage.setItem('alignment', JSON.stringify(alignment))
  }, [contextData.heroes])

  return(
    <Context.Provider value={{contextData, setContextData}}>
      { children }
    </Context.Provider>
  )
}

export default Context