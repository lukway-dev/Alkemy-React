import React, { useContext } from 'react'
import Context from '@context/Context'
import axios from 'axios'
import { useFormik } from 'formik'

const AccessToken = process.env.API_ACCESS_TOKEN

//Formik Validate
const validate = values => {
  const errors = {}
  if (!values.heroname) {
    errors.heroname = 'Por favor, complete este campo'
  }

  return errors
}

const SearcherHeader = ({ handleShowSearcher, handleSetHeroes, handleAlert }) => {
  const {contextData} = useContext(Context)

  const formik = useFormik({
    initialValues: {
      heroname: ''
    },
    validate,
    onSubmit: values => {
      axios.get(`https://superheroapi.com/api/${AccessToken}/search/${values.heroname}`)
        .then(res => {
          if(res.data.response === 'success') {
            handleSetHeroes(res.data.results)
          } else {
            handleSetHeroes('')
            handleAlert('Hubo un error en la busqueda, por favor intente con otro nombre')
          }
        })
    }
  })

  return (
    <header className="searcher-header">
      <div className="searcher-header__team">
        <div className="searcher-header__team-good">
          <i className="fas fa-smile" /> {contextData.alignment.good}/3
        </div>
        <div className="searcher-header__team-bad">
          <i className="fas fa-angry" /> {contextData.alignment.bad}/3
        </div>
      </div>

      <form className="searcher-header__form" onSubmit={formik.handleSubmit}>
        <input
          className="searcher-header__input"
          name="heroname"
          type="text"
          placeholder="Buscar personajes"
          onChange={formik.handleChange}
          value={formik.values.heroname}
        />
        <button className="searcher-header__form-button" type="submit">
          <i className="fas fa-search"/>
        </button>
      </form>

      <button className="searcher-header__button-close" onClick={handleShowSearcher}>
        <i className="fas fa-times" />
      </button>
    </header>
  )
}

export default SearcherHeader
