import React from 'react'

const HeroAdd = ({ handleShowSearcher }) => {
  return (
    <section className="hero-card-add">
      <span className="hero-card-add__text">Añadir un miembro</span>
      <button className="hero-card-add__button" onClick={handleShowSearcher}>
        <i className="fas fa-plus" />
      </button>
    </section>
  )
}

export default HeroAdd