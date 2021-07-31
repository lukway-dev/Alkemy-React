import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../context/Context'
import Header from '@containers/Header'
import Searcher from '@containers/Searcher'
import Team from '@containers/Team'
import TeamStats from '../components/TeamStats'

const Home = () => {
  const { contextData } = useContext(Context)
  const [showSearcher, setShowSearcher] = useState(false)

  const handleShowSearcher = () => {
    setShowSearcher(!showSearcher)
  }

  return (
    <main>
      <Header/>
      <Team handleShowSearcher={handleShowSearcher}/>
      {
        showSearcher
          ? <Searcher handleShowSearcher={handleShowSearcher}/>
          : null
      }

      {
        contextData.heroes.length > 0
          ? <TeamStats/>
          : null
      }

      {!contextData.token
        ? <Redirect to="/login"/>
        : null}
    </main>
  )
}

export default Home