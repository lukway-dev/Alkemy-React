import React, { useContext, useState, useEffect } from 'react'
import HeroImage from '@images/homehero.svg'
import Context from '../context/Context'

const TeamStats = () => {
  const {contextData, setContextData} = useContext(Context)
  const [stats, setStats] = useState({
    powerstats: [],
    height: '',
    weight: ''
  })

  const heroesQuantity = contextData.heroes.length
  const heroesStats = contextData.heroes.map(heroe => heroe.powerstats)
  const heroesHeight = contextData.heroes.map(heroe => heroe.appearance)
  const heroesWeight = contextData.heroes.map(heroe => heroe.appearance)

  let totalStats
  let sortStats = []
  let averageHeight
  let averageWeight

  // Averages
  useEffect(() => {
    if(heroesQuantity > 0){
      totalStats = {
        combat: heroesStats.reduce((accumulator, value) => accumulator + Number(value.combat), 0),
        durability: heroesStats.reduce((accumulator, value) => accumulator + Number(value.durability), 0),
        intelligence: heroesStats.reduce((accumulator, value) => accumulator + Number(value.intelligence), 0),
        power: heroesStats.reduce((accumulator, value) => accumulator + Number(value.power), 0),
        speed: heroesStats.reduce((accumulator, value) => accumulator + Number(value.speed), 0),
        strength: heroesStats.reduce((accumulator, value) => accumulator + Number(value.strength), 0)
      }

      averageHeight = Math.round(heroesHeight.reduce((accumulator, value) => accumulator + Number(value.height[1].slice(0, -3)), 0) / heroesQuantity)
      averageWeight = Math.round(heroesWeight.reduce((accumulator, value) => accumulator + Number(value.weight[1].slice(0, -3)), 0) / heroesQuantity)

      // Add icons
      let icons = ['user-ninja', 'heartbeat', 'brain', 'fist-raised', 'running','dumbbell']

      // Sort stats and add icons
      for (let stat in totalStats) {
        sortStats.push([stat, totalStats[stat], icons[Object.keys(totalStats).indexOf(stat)]])
      }
      sortStats.sort((a, b) => {
        return b[1] - a[1]
      })

      setStats({
        powerstats: sortStats,
        height: averageHeight,
        weight: averageWeight
      })
    }
  }, [heroesQuantity])

  console.log(stats)

  return (
    <section className="team-stats">
      <div className="team-stats__container">
        {
          stats.powerstats.map(stat =>
            <div className="team-stats__item" key={stat[0]}>
              <b
                className={`team-stats__item--${stat[0]}`} >
                <i className={`fas fa-${stat[2]}`} /> {stat[0]} {stat[1]}
              </b>
              <meter
                className={`team-stats__item-value--${stat[0]}`}
                value={stat[1]}
                min={0}
                max={100 * heroesQuantity}>
              </meter>
            </div>
          )
        }
      </div>

      <div className="team-stats__image-container">
        <img className="team-stats__image" src={HeroImage} />
      </div>

      <div className="team-stats__apparence">
        <div className="team-stats__apparence-item">
          <h3 className="team-stats__apparence-caption">
            <i className="fas fa-male"/> Altura Promedio
          </h3>
          <span className="team-stats__apparence-value">{stats.height} cm</span>
        </div>

        <div className="team-stats__apparence-item">
          <h3 className="team-stats__apparence-caption">
            <i className="fas fa-weight"/> Peso Promedio
          </h3>
          <span className="team-stats__apparence-value">{stats.weight} kg</span>
        </div>
      </div>
    </section>
  )
}

export default TeamStats