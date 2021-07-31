/* eslint-disable indent */
import React, { useContext, useState } from 'react'
import HeroImage from '@images/detailhero.svg'
import Context from '../context/Context'

const HeroCard = ({ data }) => {
  const {contextData, setContextData} = useContext(Context)
  const [flip, setFlip] = useState(false)

  // Sort stats
  const stats = data.powerstats
  let sortStats = []
  for (let stat in stats) {
    sortStats.push([stat, stats[stat]])
  }
  sortStats.sort((a, b) => {
    return b[1] - a[1]
  })

  const handleDeleteHero = () => {
    const heroes = contextData.heroes.filter(hero => hero.id !== data.id)
    const alignment = data.biography.alignment
    const goodQuantity = contextData.alignment.good
    const badQuantity = contextData.alignment.bad

    if(alignment === 'good'){
      setContextData({
        ...contextData,
        heroes,
        alignment: {
          ...contextData.alignment,
          good: goodQuantity - 1
        }
      })
    }
    if(alignment === 'bad'){
      setContextData({
        ...contextData,
        heroes,
        alignment: {
          ...contextData.alignment,
          bad: badQuantity - 1
        }
      })
    }
  }

  const handleFlipCard = () => {
    setFlip(!flip)
  }

  return (
    <div className={flip ? 'hero-card-container--flip' : 'hero-card-container'}>
      <div className="hero-card">
        <div className="hero-card__image-container">
          <img className="hero-card__image" src={data.image.url} alt={data.name} />
          <h2 className="hero-card__name">{data.name}</h2>
        </div>

        <div className="hero-card__details">
          <div className="hero-card__menu">
            <b className="hero-card__caption">Estadísticas: </b>
            <div className="hero-card__button-container">
              <button className="hero-card__button--details" title="Detalles" onClick={handleFlipCard}>
                <i className="fas fa-info-circle"/>
              </button>
              <button className="hero-card__button--delete" title="Eliminar Personaje" onClick={handleDeleteHero}>
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          </div>

          <div className="hero-card__stats-container">
            {
              sortStats.map(stat =>
                <div className="hero-card__stat-item" key={stat[0]}>
                  <span className={`hero-card__stat--${stat[0]}`} >{stat[0]} {stat[1]}</span>
                  <meter className={`hero-card__stat-value--${stat[0]}`} value={stat[1]} min={0} max={100}></meter>
                </div>
              )
            }
          </div>
        </div>
      </div>

      <div className="hero-details">
        <div>
          <h2 className="hero-details__name">{data.name}</h2>
          <span className="hero-details__alias">{data.biography.aliases[0]}</span>
        </div>

        <button className="hero-details__button" onClick={handleFlipCard}>
          <i className="fas fa-times" />
        </button>

        <div className="hero-details__image-container">
          <b>{data.appearance.height[1]}</b>
          <img src={HeroImage} alt="Detail Hero"/>
          <b>{data.appearance.weight[1]}</b>
        </div>

        <div className="hero-details__info">
          {
            data.biography.alignment === 'good'
              ? <i className="hero-details__info--good fas fa-smile" />
              : <i className="hero-details__info--bad fas fa-angry" />
          }
          <span>Orientación: <b>{data.biography.alignment}</b></span>
          <i className="hero-details__info-icon fas fa-user" /><span>Raza: <b>{data.appearance.race}</b></span>
          <i className="hero-details__info-icon far fa-eye" /><span>Color de Ojos: <b>{data.appearance['eye-color']}</b></span>
          <i className="hero-details__info-icon fas fa-cut" /><span>Color de Pelo: <b>{data.appearance['hair-color']}</b></span>
          <i className="hero-details__info-icon fas fa-briefcase" /><span>Lugar de Trabajo: <b>{data.work.base}</b></span>
        </div>
      </div>
    </div>
  )
}

export default HeroCard
