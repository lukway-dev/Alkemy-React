/* eslint-disable indent */
import React, { useState } from 'react'
import SearcherHeader from '@components/SearcherHeader'
import SearcherHero from '@components/SearcherHero'
import SearcherBackground from '../components/SearcherBackground'

const Searcher = ({ handleShowSearcher }) => {
  const [heroes, setHeroes] = useState('')
  const [alert, setAlert] = useState('')

  // Alert if the number of good or bad heroes is exceeded
  const handleAlert = (message) => {
    setAlert(message)
  }

  const handleSetHeroes = (heroes) => {
    setHeroes(heroes)
  }

  return (
    <section className="searcher">
      <div className="searcher__container">

        <SearcherHeader handleShowSearcher={handleShowSearcher} handleSetHeroes={handleSetHeroes} handleAlert={handleAlert}/>

        {heroes
          ? <div className="searcher__hero-container">
              {
                heroes.map(heroe =>
                  <SearcherHero key={heroe.id} data={heroe} handleAlert={handleAlert}/>
                )
              }
            </div>
          : <SearcherBackground/>
        }

        {
          alert
            ? <div className="searcher__alert-container">
                <div className="searcher__alert">
                  <button className="searcher__alert-close" onClick={() => handleAlert('')}>
                    <i className="fas fa-times" />
                  </button>
                  {alert}
                </div>
              </div>
            : null
        }
      </div>
    </section>
  )
}

export default Searcher