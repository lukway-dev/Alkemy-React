import React from 'react'
import HeroImage from '@images/searcherhero.svg'

const SearcherBackground = () => {
  return (
    <div className="searcher-background">
      <span className="searcher-background__text">
          Busca entre tus personajes favoritos <br />
          Puedes elegir <span className="searcher-background__text-green">3 heroes</span> y <span className="searcher-background__text-red">3 villanos</span>
      </span>
      <div className="searcher-background__image-container">
        <img className="searcher-background__image" src={HeroImage} alt="SuperHero" />
      </div>
    </div>
  )
}

export default SearcherBackground