import React, { useContext } from 'react'
import Context from '@context/Context'
import HeroAdd from '@components/HeroAdd'
import HeroCard from '@components/HeroCard'


const Team = ({ handleShowSearcher }) => {
  const {contextData} = useContext(Context)
  const heroes = contextData.heroes

  return (
    <section className="team">
      {
        heroes
          ? heroes.map(heroe =>
            <HeroCard key={heroe.id} data={heroe}/>
          )
          : null
      }
      {
        heroes.length < 6
          ? <HeroAdd handleShowSearcher={handleShowSearcher}/>
          : null
      }
    </section>
  )
}

export default Team