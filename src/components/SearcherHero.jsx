import React, { useContext, useState } from 'react'
import Context from '../context/Context'

const SearcherHero = ({ data, handleAlert }) => {
  const { contextData, setContextData} = useContext(Context)
  const heroExist = contextData.heroes.filter(hero => hero.id === data.id)
  const alignment = data.biography.alignment
  const goodQuantity = contextData.alignment.good
  const badQuantity = contextData.alignment.bad


  const handleAddHero = () => {
    // Verification of the hero's existence and alignment
    if(heroExist.length === 0){

      if(alignment === 'good'){
        if(goodQuantity < 3){
          setContextData({
            ...contextData,
            heroes: [
              ...contextData.heroes,
              data
            ],
            alignment: {
              ...contextData.alignment,
              good: goodQuantity + 1
            }
          })
        } else {
          handleAlert('Ya tienes muchos heroes')
        }
      }

      if(alignment === 'bad'){
        if(badQuantity < 3) {
          setContextData({
            ...contextData,
            heroes: [
              ...contextData.heroes,
              data
            ],
            alignment: {
              ...contextData.alignment,
              bad: badQuantity + 1
            }
          })
        } else {
          handleAlert('Ya tienes muchos villanos')
        }
      }
    }
  }

  const handleDeleteHero = () => {
    const heroes = contextData.heroes.filter(hero => hero.id !== data.id)

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

  return (
    <div className="searcher-hero">
      <h3 className="searcher-hero__title">{data.name}</h3>
      <img className="searcher-hero__image" src={data.image.url} alt={data.name} title={data.name}/>

      {alignment === 'good'
        ? <i className="searcher-hero__alignment--good fas fa-smile" />
        : <i className="searcher-hero__alignment--bad fas fa-angry" />
      }

      {heroExist.length === 0
        ? <button className="searcher-hero__button--add" onClick={handleAddHero}>
          <i className="fas fa-plus"/> Agregar
        </button>
        : <button className="searcher-hero__button--delete" onClick={handleDeleteHero}>
          <i className="fas fa-trash-alt"/> Eliminar
        </button>
      }
    </div>
  )
}

export default SearcherHero